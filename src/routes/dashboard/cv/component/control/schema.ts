import { z } from 'zod'

export const basicSchema = z.object({
  name: z.string().min(1, { message: 'name required' }),
  email: z.string().optional(),
  photo: z.string().optional(),
  description: z.string().optional(),
  address: z.string().optional(),
  portfolio: z.string().optional(),
  linkedin: z.string().optional(),
  phone: z.string().optional(),
})

export const educationSchema = z.object({
  educations: z
    .object({
      title: z.string(),
      school: z.string(),
      description: z.string(),
      start_date: z.string().date(),
      end_date: z.string().date(),
    })
    .array()
    .optional(),
})

export const experienceSchema = z.object({
  experience: z
    .object({
      title: z.string(),
      company: z.string(),
      description: z.string(),
      start_date: z.string().date(),
      end_date: z.string().date(),
      link: z.string(),
    })
    .array()
    .optional(),
})

export const portfolioSchema = z.object({
  portfolios: z
    .object({
      title: z.string(),
      role: z.string(),
      description: z.string(),
      start_date: z.string().date(),
      end_date: z.string().date(),
      link: z.string(),
    })
    .array()
    .optional(),
})

export const skillSchema = z.object({
  skills: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .array()
    .optional(),
})
