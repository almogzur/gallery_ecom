import {z} from 'zod'

export const ZodGetAllAssets = z.object({

  
})

export const ZodGetAllPosts = z.object({
  
})



export const ZODNewUserValidationSchema = z.object({
  name: z.string(),
  password: z.string(),
  displayName:z.string().optional(),
})



export const ZODBlogPostSchema = z.object({
  author: z.string(),
  date: z.string(),
  title: z.string(),
  selectedImage: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  description: z.string(),
  isMain: z.boolean(),
});




