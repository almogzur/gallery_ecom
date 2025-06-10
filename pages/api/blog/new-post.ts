import { rateLimitConfig } from "@/util/api_rate_limit_config";
import { CreateMongooseClient } from "@/util/mongoose/com/mongosee-connect";
import { HttpStatusCode } from "axios";
import rateLimit from "express-rate-limit";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ValidateNewPost } from "@/types/zod_main";
import { bounedBlogsModel } from "@/util/mongoose/models/mongosee-models";


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

const connection  = await CreateMongooseClient(session.user.name)

if(!connection){  
     return res.status(500).json({massage:'No DB Connection'})
}
 const body = req.body 
 const isValidData = ValidateNewPost.safeParse(body) 

if(!isValidData.success){
        return res.status(400).json({massage:'bad input'})
}

 const BlogModle  = bounedBlogsModel(connection)

 const doc = new BlogModle(isValidData.data)

 const isSaved = await doc.save()

if(!isSaved){
  return res.status(500).json({massage:' saving post Error' + API_NAME})
}

return res.status(200).json({massage:'post saved'+ API_NAME})     

  })
}


export const config = {
api: {
 externalResolver: true, 
}
}