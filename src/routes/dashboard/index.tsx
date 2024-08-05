import { Button, buttonVariants } from '@/components/ui/button'
import { PATHS } from '@/constant/_paths'
import { generatePath, Link, useNavigate } from 'react-router-dom'
import Layout from './layout'
import { useResumes } from '@/hooks/api/use-resume'
import { useMemo } from 'react'
import { Resume } from '@/types/resume'
import CvImage from '/cv.png'
import { Eye } from 'lucide-react'

export default function Page() {
  const { data, isLoading } = useResumes()

  const resumes = useMemo(() => {
    if (isLoading) return []
    return data?.data.data
  }, [data, isLoading])

  return (
    <Layout>
      <div className='pt-4'>
        {resumes.length > 0 ? <MyResume data={resumes} /> : <EmptyResume />}
      </div>
    </Layout>
  )
}

function EmptyResume() {
  return (
    <div className='h-[80dvh] w-full flex justify-center items-center'>
      <Link
        className={buttonVariants({ variant: 'default' })}
        to={PATHS.DASHBOARD_RESUME}
      >
        Buat CV
      </Link>
    </div>
  )
}

type Props = {
  data: Resume & { id: string; status: 'DRAFT' | 'PUBLIC' }[]
}
function MyResume(props: Props) {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <p>My Resume</p>
        <Link
          className={buttonVariants({ variant: 'default' })}
          to={PATHS.DASHBOARD_RESUME}
        >
          Buat CV
        </Link>
      </div>
      <div className='grid grid-cols-4 gap-8'>
        {props.data?.map((resume) => (
          <div
            key={resume.id}
            className='flex flex-col justify-center items-center relative'
          >
            <img src={CvImage} alt='cv' className='w-20 h-auto' />
            {resume.status == 'PUBLIC' && (
              <div className='absolute top-28 left-1/2 -translate-x-1/2 flex gap-1 items-center'>
                <Eye className='w-4 h-4' />
                <p className='text-sm'>Public CV</p>
              </div>
            )}
            <div className='flex gap-2 items-center mt-8'>
              <Button
                size='sm'
                className='bg-white text-xs px-2 py-1.5 h-fit rounded'
                variant='secondary'
                onClick={() =>
                  navigate(`${PATHS.DASHBOARD_RESUME}?id=${resume.id}`)
                }
              >
                Edit
              </Button>
              <Button
                size='sm'
                className='bg-amber-400 text-xs px-2 py-1.5 h-fit rounded'
                variant='secondary'
                onClick={() =>
                  navigate(`${PATHS.DASHBOARD}?publish=${resume.id}`)
                }
              >
                Publish
              </Button>
              <Button
                size='sm'
                variant='destructive'
                className='text-xs px-2 py-1.5 h-fit rounded'
                onClick={() =>
                  navigate(`${PATHS.DASHBOARD}?delete=${resume.id}`)
                }
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
