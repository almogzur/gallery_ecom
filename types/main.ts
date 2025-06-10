import {z} from 'zod'
import { ResourceApiResponse } from "cloudinary"
import { NewUserValidationShema, ValidateNewPost } from './zod_main'
import { StaticImageData } from 'next/image'




export const getAllassetsZVS = z.object({})


export type ImagePropsType = ResourceApiResponse["resources"][0]

export type Size = {
  width: number
  height: number
}

export type Breakpoints = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' 

export type OrientationSizes = {
  [key in Breakpoints]: Size
}

export type ImageSizesType = {
  landscape: OrientationSizes
  portrait: OrientationSizes
}

export type GetAllAssestsReqType = z.infer< typeof getAllassetsZVS>

export type NewUserType = z.infer<typeof NewUserValidationShema>

export type NewPostType = z.infer<typeof ValidateNewPost>

export type PostStructType = {
  image: {
    src:string
    width:number
    height:number
  }
  title:string
  body:string
  description:string
  tags:string[]
  alt:string
}
