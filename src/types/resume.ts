type Experiences = {
  title: string
  company: string
  description: string
  start_date: string
  end_date: string
  link: string
}

type Educations = {
  title: string
  school: string
  description: string
  start_date: string
  end_date: string
}

type Portfolios = {
  title: string
  role: string
  description: string
  start_date: string
  end_date: string
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
  portfolio: Partial<Portfolios[]>
  skills: Partial<Skills[]>
}
