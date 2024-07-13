import * as z from 'zod'

export const registerFirstSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
})

export const registerSecondSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string().email(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords tidak sama',
    path: ['confirmPassword'],
  })
