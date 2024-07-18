import useUrlState from '@ahooksjs/use-url-state'
import { EditResume, Resume } from './component'
import { atom } from 'jotai'

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
  name: string
}

type Resume = {
  design: number
  name: string
  photo: string
  description: string
  address: string
  email: string
  portfolio: string
  linkedin: string
  phone: string
  experience: Experiences[]
  educations: Educations[]
  portfolios: Portfolios[]
  skills: Skills[]
}

export const resumeAtom = atom<Partial<Resume>>({})

export default function Page() {
  const [url, _] = useUrlState({
    id: '',
  })

  if (url.id !== '') return <EditResume />

  return <Resume />
}
