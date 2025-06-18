import { rateLimitConfig } from "@/util/api_rate_limit_config";
import { CreateMongooseClient } from "@/util/mongeese/connect";
import { HttpStatusCode } from "axios";
import rateLimit from "express-rate-limit";
import { NextApiRequest, NextApiResponse } from "next";
import { boundedBlogsModel } from "@/util/mongeese/models";

const apiLimiter = rateLimit(rateLimitConfig);

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<void>{
  return apiLimiter(req, res,async () => {

    const API_NAME =  'Get Blog Posts API' 

    console.log(API_NAME) 

  if (req.method !== 'GET') { 
      return  res.status(HttpStatusCode.MethodNotAllowed).json({ message: 'API_NAME'+ API_NAME })
}

const connection  = await CreateMongooseClient(null)

if(!connection){  
     return res.status(HttpStatusCode.InternalServerError).json({massage:'No DB Connection'})
}

 const BlogModel  = boundedBlogsModel(connection)

 const Posts = await BlogModel.find({},{},{lean:true})


 if(!Posts){
  return res.status(HttpStatusCode.NoContent).json({massage:'No Blog Posts'})
 }

 res.status(200).json(Posts)


})
}


export const config = {
api: {
 externalResolver: true, 
}
}