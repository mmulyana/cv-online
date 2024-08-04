type Experiences = {
  title: string
  company: string
  description: string
  startDate: string
  endDate: string
  link: string
}

type Educations = {
  title: string
  school: string
  description: string
  startDate: string
  endDate: string
}

type Portfolios = {
  title: string
  role: string
  description: string
  startDate: string
  endDate: string
  link: string
}

type Skills = {
  id: number
  name?: string
}

type Contact = {
  email: string
  portofolioWeb: string
  linkedin: string
  phone: string
}

export type Resume = {
  design?: string
  name?: string
  photo?: string
  description?: string
  address?: string
  contact: Partial<Contact>
  experience: Partial<Experiences[]>
  education: Partial<Educations[]>
  portofolio: Partial<Portfolios[]>
  skills: Partial<Skills[]>
}
