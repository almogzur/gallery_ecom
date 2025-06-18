import { BlogPostSchemaType } from "@/types/main"
import axios, {  AxiosError } from "axios"

const baseUrl = 'http://localhost:8888'

import { ResourceApiResponse } from "cloudinary"

export const getPostCall = async () : Promise<BlogPostSchemaType[]|undefined> => {
       try{ 
         const response = await axios.get(`${baseUrl}/api/blog/get-posts`)
         return  response.data
        }
       catch (err: unknown){  
         if(err instanceof AxiosError){
           console.log(err.toJSON() , "AxiosError")
         }
         else{
           console.log(err)
         }
         return undefined
       }
       
 }

export const getAssetsCall = async (): Promise<ResourceApiResponse|undefined> => {

    try {
      const response = await axios.get( `${baseUrl}/api/profile/assets`)
      return response.data
    }
    catch (err: unknown) {
      console.log(err)
      return undefined
    }

  }