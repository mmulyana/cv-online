import useUrlState from '@ahooksjs/use-url-state'
import { EditResume, Resume } from './component'
import { atomWithStorage } from 'jotai/utils'
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

export const resumeAtom = atomWithStorage<Resume | null>('resume', null)
export const isResumeChangedAtom = atom(false)

export default function Page() {
  const [url, _] = useUrlState({
    id: '',
  })

  if (url.id !== '') return <EditResume />

  return <Resume />
}
