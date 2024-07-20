import * as z from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, { message: 'username required' }),
  password: z
    .string()
    .min(8, { message: 'Password must at least 8 characters' }),
})
