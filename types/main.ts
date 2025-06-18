import {z} from 'zod'
import { ResourceApiResponse } from "cloudinary"
import {  ZODBlogPostSchema,  ZodGetAllAssets, ZodGetAllPosts, ZODNewUserValidationSchema } from './zod_main'



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

export type GetAllAssessReqType = z.infer< typeof ZodGetAllAssets>

export type GetAllPostsReqType = z.infer< typeof ZodGetAllPosts>

export type NewUserType = z.infer<typeof ZODNewUserValidationSchema>

export type BlogPostSchemaType = z.infer<typeof ZODBlogPostSchema>


