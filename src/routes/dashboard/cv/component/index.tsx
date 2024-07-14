import Layout from '@/routes/dashboard/layout'
import Control from './control'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import Preview from './preview'

export function Resume() {
  return (
    <Layout className='!px-0'>
      <ResizablePanelGroup direction='horizontal' className='w-full border'>
        <ResizablePanel defaultSize={35}>
          <Control />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={65}>
          {/* <Preview /> */}
        </ResizablePanel>
      </ResizablePanelGroup>
    </Layout>
  )
}

type EditProps = {
  id: number
}
export function EditResume(props: EditProps) {
  return (
    <Layout>
      <p>Edit Resume</p>
    </Layout>
  )
}
