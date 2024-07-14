import Layout from '@/routes/dashboard/layout'
import Control from './control'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

export function Resume() {
  return (
    <Layout className='!px-0'>
      <ResizablePanelGroup direction='horizontal' className='w-full border'>
        <ResizablePanel defaultSize={35}>
          <Control />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={65}></ResizablePanel>
      </ResizablePanelGroup>
    </Layout>
  )
}

type EditProps = {
  id: number
}
export function EditResume(){
  return (
    <Layout>
      <p>Edit Resume</p>
    </Layout>
  )
}
