import { z } from 'zod'

export const basicSchema = z.object({
  name: z.string().min(1, { message: 'name required' }),
  photo: z.string().optional(),
  description: z.string().optional(),
  address: z.string().optional(),
  contact: z
    .object({
      email: z.string().optional(),
      portofolioWeb: z.string().optional(),
      linkedin: z.string().optional(),
      phone: z.string().optional(),
    })
    .optional(),
})

export const educationSchema = z.object({
  education: z
    .object({
      title: z.string().optional(),
      school: z.string().optional(),
      description: z.string().optional(),
      startDate: z.string().date().optional(),
      endDate: z.string().date().optional(),
    })
    .array()
    .optional(),
})

export const experienceSchema = z.object({
  experience: z
    .object({
      title: z.string().optional(),
      company: z.string().optional(),
      description: z.string().optional(),
      startDate: z.string().date().optional(),
      endDate: z.string().date().optional(),
      link: z.string().optional(),
    })
    .array()
    .optional(),
})

export const portfolioSchema = z.object({
  portofolio: z
    .object({
      title: z.string(),
      role: z.string(),
      description: z.string(),
      startDate: z.string().date(),
      endDate: z.string().date(),
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
