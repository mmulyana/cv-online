import { Resume as ResumeTypes } from '@/types/resume'
import useUrlState from '@ahooksjs/use-url-state'
import { EditResume, Resume } from './component'
import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'

export const resumeAtom = atomWithStorage<ResumeTypes | null>('resume', null)
export const isResumeChangedAtom = atom(false)

export default function Page() {
  const [url, _] = useUrlState({
    id: '',
  })

  if (url.id !== '') return <EditResume />

  return <Resume />
}
