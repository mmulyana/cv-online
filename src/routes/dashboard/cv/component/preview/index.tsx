import { useAtomValue } from 'jotai'
import { resumeAtom } from '../..'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import CV from '@/components/cv'
import { Button } from '@/components/ui/button'
import { useMemo, useState } from 'react'

export default function Preview() {
  const resume = useAtomValue(resumeAtom)
  const [styleId, setStyleId] = useState(1)

  const cvStylesButton = useMemo(
    () => [
      {
        name: 'Basic',
        active: 1,
        onClick: () => setStyleId(1),
      },
      {
        name: 'Basic 2',
        active: 2,
        onClick: () => setStyleId(2),
      },
    ],
    []
  )

  return (
    <ScrollArea className='relative h-[calc(100dvh-66px)]'>
      <div className='mx-auto block bg-white w-[600px] mt-4 shadow-lg shadow-gray-400/10 rounded'>
        <CV data={resume} styleId={styleId} />
      </div>
      <div className='absolute bottom-0 left-0 w-full bg-white p-2'>
        <p className='text-gray-600 text-sm'>Choose you cv style</p>
        <div className='flex gap-2 items-center mt-1.5'>
          {cvStylesButton.map((cv, index) => (
            <Button
              key={index}
              variant={cv.active === styleId ? 'default' : 'outline'}
              onClick={cv.onClick}
            >
              {cv.name}
            </Button>
          ))}
        </div>
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}
