import * as z from 'zod'

export const registerFirstSchema = z.object({
  username: z.string().min(1, { message: 'username required' }),
  email: z.string().email(),
})

export const registerSecondSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'password must at least 8 character' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'confirm password must at least 8 character' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password not match',
    path: ['confirmPassword'],
  })
