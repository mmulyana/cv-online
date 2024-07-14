import { useAtomValue } from 'jotai'
import { resumeAtom } from '../..'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Preview() {
  const resume = useAtomValue(resumeAtom)
  return (
    <ScrollArea>
        <div className=''>
      <p>Name: {resume?.name}</p>
        </div>
    </ScrollArea>
  )
}
