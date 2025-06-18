import { rateLimitConfig } from "@/util/api_rate_limit_config";
import { CreateMongooseClient } from "@/util/mongeese/connect";
import { HttpStatusCode } from "axios";
import rateLimit from "express-rate-limit";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ZODBlogPostSchema  } from "@/types/zod_main";
import { boundedBlogsModel } from "@/util/mongeese/models";


const apiLimiter = rateLimit(rateLimitConfig);

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<void>{
  return apiLimiter(req, res,async () => {

    const API_NAME =  'save new blog post API' 

    console.log(API_NAME)

if (req.method !== 'POST') { 
      return  res.status(HttpStatusCode.MethodNotAllowed).json({ message: 'API_NAME' })
}

 const session = await getServerSession(req, res, authOptions);

if( ! session || ! session.user || ! session.user.name){
       return res.status(HttpStatusCode.Unauthorized).json({massage:'YOU SHELL NOT PASS @!!' })
}

const connection  = await CreateMongooseClient(null)

if(!connection){  
     return res.status(500).json({massage:'No DB Connection'})
}
 const body = req.body 
 console.log(body)
 const isValidData = ZODBlogPostSchema.safeParse(body) 

if( ! isValidData.success){
          console.log(isValidData.error.errors)
        return res.status(HttpStatusCode.NotAcceptable).json({massage:'bad input'})
}

 const BlogModel  = boundedBlogsModel(connection)

 const PostDate  = new Date().toLocaleDateString("he-IL")

 //   edit in  13 jun 2025

 
 /*
 JavaScript Temporal is coming !!
 # https://developer.mozilla.org/en-US/blog/javascript-temporal-is-coming/
 The current date in the system's time zone

const dateTime = Temporal.Now.plainDateTimeISO();
console.log(dateTime); // e.g.: 2025-01-22T11:46:36.144

// The current date in the "America/New_York" time zone

const dateTimeInNewYork = Temporal.Now.plainDateTimeISO("America/New_York");
console.log(dateTimeInNewYork);
 e.g.: 2025-01-22T05:47:02.555
*/

 const doc = new BlogModel({
  ... isValidData.data,
      date: PostDate ,
    })

 const isSaved = await doc.save()

if(isSaved.errors){
  console.log(isSaved.errors)
  return res.status(HttpStatusCode.InternalServerError).json({massage:' saving post Error' + API_NAME})
}

return res.status(HttpStatusCode.Created).json({massage:'post saved'+ API_NAME})     
  

})
}

export const config = {
api: {
 externalResolver: true, 
}
}