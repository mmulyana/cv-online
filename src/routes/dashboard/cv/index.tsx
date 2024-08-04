import { Resume as ResumeTypes } from '@/types/resume'
import useUrlState from '@ahooksjs/use-url-state'
import { EditResume, Resume } from './component'
import { atomWithStorage } from 'jotai/utils'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

export const resumeAtom = atomWithStorage<ResumeTypes | null>('resume', null)

export default function Page() {
  const [url, _] = useUrlState({
    id: '',
  })

  const [resume, setResume] = useAtom(resumeAtom)

  useEffect(() => {
    if (resume !== null) return
    if (resume == null) {
      setResume((prev) => ({ ...prev, design: '1', skills: [] }))
    }
  }, [])

  if (url.id !== '') return <EditResume />

  return <Resume />
}
