import useUrlState from '@ahooksjs/use-url-state'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '@/constant/_paths'
import { cn } from '@/utils/cn'
import { useAtom, useAtomValue } from 'jotai'
import { resumeAtom } from '.'
import { useCreateResume } from '@/hooks/api/use-resume'

export default function Layout({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  return (
    <>
      <Navbar />
      <div className={cn('px-4 md:px-6 pt-16', className)}>{children}</div>
    </>
  )
}

export function Navbar() {
  const navigate = useNavigate()
  const [url, _] = useUrlState<{ id: string }>()

  const { mutate: createResume } = useCreateResume()

  const resume = useAtomValue(resumeAtom)

  const onCancel = () => navigate(PATHS.DASHBOARD)
  const onSave = () => {
    if (url.id) {
      return
    }
    createResume(resume, {
      onSuccess: () => {
        navigate(PATHS.DASHBOARD)
      },
    })
  }

  return (
    <header className='fixed top-0 left-0 flex h-16 w-full items-center justify-between border-b bg-background z-10'>
      <div className='flex justify-between items-center gap-2 px-4 md:px-6 w-full'>
        <p className='text-lg font-semibold'>
          {url.id ? 'Edit' : 'Create'} Resume
        </p>

        <div className='flex gap-3'>
          <Button variant='outline' onClick={onCancel} size='sm'>
            Cancel
          </Button>
          <Button size='sm' onClick={onSave}>
            {url.id ? 'Update' : 'Save'}
          </Button>
        </div>
      </div>
    </header>
  )
}
