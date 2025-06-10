import {z} from 'zod'


export const NewUserValidationShema = z.object({
  name: z.string(),
  password: z.string(),
  displayName:z.string().optional(),
})

export const ValidateNewPost = z.object({
  title: z.string(),
  description: z.string(),
  body: z.string(),
  tags: z.array(z.string()),
  image: z.string(),
})