import { Button, buttonVariants } from '@/components/ui/button'
import { PATHS } from '@/constant/_paths'
import { generatePath, Link, useNavigate } from 'react-router-dom'
import Layout from './layout'
import { useResumes } from '@/hooks/api/use-resume'
import { useMemo } from 'react'
import { Resume } from '@/types/resume'
import CvImage from '/cv.png'

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
  data: Resume & { id: string }[]
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
      <div className='grid grid-cols-4 gap-6'>
        {props.data?.map((resume) => (
          <div
            key={resume.id}
            className='flex flex-col justify-center items-center'
          >
            <img src={CvImage} alt='cv' className='w-20 h-auto' />
            <div className='flex gap-2 items-center mt-4'>
              <Button
                size='sm'
                className='bg-white'
                variant='secondary'
                onClick={() =>
                  navigate(`${PATHS.DASHBOARD_RESUME}?id=${resume.id}`)
                }
              >
                Edit
              </Button>
              <Button size='sm' className='bg-amber-400' variant='secondary'>
                Publish
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
