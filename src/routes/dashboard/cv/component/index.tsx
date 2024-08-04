import Layout from '../layout'
import Control from './control'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import Preview from './preview'
import { useResumeById } from '@/hooks/api/use-resume'
import useUrlState from '@ahooksjs/use-url-state'
import { useEffect, useState } from 'react'
import { useSetAtom } from 'jotai'
import { resumeAtom } from '..'

export function Resume() {
  return <ResumeEditor />
}

export function EditResume() {
  const [url, _] = useUrlState<{ id: string }>()
  const [hasChanged, setHasChanged] = useState(false)

  const { data, isLoading } = useResumeById(Number(url.id))

  const setResume = useSetAtom(resumeAtom)

  useEffect(() => {
    if (!isLoading && !hasChanged) {
      setResume(data?.data.data)
      setHasChanged(true)
    }

  }, [hasChanged, isLoading, data])

  return <ResumeEditor />
}

function ResumeEditor() {
  return (
    <Layout className='!px-0'>
      <ResizablePanelGroup direction='horizontal' className='w-full border'>
        <ResizablePanel defaultSize={48}>
          <Control />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={52}>
          <Preview />
        </ResizablePanel>
      </ResizablePanelGroup>
    </Layout>
  )
}
