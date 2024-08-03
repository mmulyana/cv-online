import { useAtomValue } from 'jotai'
import { resumeAtom } from '../..'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import CV from '@/components/cv'

export default function Preview() {
  const resume = useAtomValue(resumeAtom)

  return (
    <ScrollArea className='relative h-[calc(100dvh-66px)]'>
      <div className='mx-auto block bg-white w-[600px] mt-4 shadow-lg shadow-gray-400/10 rounded'>
        <CV data={resume} styleId={Number(resume?.design || 1)} />
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}
