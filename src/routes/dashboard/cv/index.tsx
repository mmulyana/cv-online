import useUrlState from '@ahooksjs/use-url-state'
import { EditResume, Resume } from './component'
import { atom } from 'jotai'

export const resumeAtom = atom<Record<string, string>>({})

export default function Page() {
  const [url, _] = useUrlState({
    id: '',
  })

  if (url.id !== '') return <EditResume id={Number(url.id)} />

  return <Resume />
}
