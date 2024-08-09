import { buttonVariants } from '@/components/ui/button'
import { PATHS } from '@/constant/_paths'
import { Link, useNavigate } from 'react-router-dom'
import Layout from './layout'
import { useResumes } from '@/hooks/api/use-resume'
import { useMemo } from 'react'
import { Resume } from '@/types/resume'
import CvImage from '/cv.png'
import {
  EllipsisVerticalIcon,
  Eye,
  ForwardIcon,
  PencilIcon,
  Trash,
} from 'lucide-react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { BASE_URL } from '@/constant/_base'
import { toast } from 'sonner'

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

type Resumes = Resume & { id: string; status: 'DRAFT' | 'PUBLIC' }
type Props = {
  data: Resumes[]
}
function MyResume(props: Props) {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-1'>
          <p>Resume</p>
          <div className='h-5 w-5 rounded-full bg-gray-700 relative'>
            <p className='text-white text-xs absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2'>
              {props.data.length}
            </p>
          </div>
        </div>
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
            className='flex flex-col justify-center items-center relative bg-gray-200 rounded border border-gray-300/50 h-40 overflow-hidden'
          >
            {resume.status == 'PUBLIC' && (
              <div className='flex gap-0.5 items-center absolute top-2 right-2 bg-white px-1 pr-1.5 py-0.5 rounded shadow-md'>
                <Eye className='w-4 h-4 text-gray-600' />
                <p className='text-xs text-gray-400'>Public CV</p>
              </div>
            )}
            <div className='flex gap-2 items-center justify-between absolute left-0 bottom-0 w-full bg-white h-14 px-2'>
              <div>
                <p className='text-xs text-gray-800'>{resume.name}</p>
                <p className='text-xs text-gray-400'>{resume.description}</p>
              </div>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className='h-fit px-1.5 rounded bg-white hover:shadow-md border border-transparent hover:border-gray-200 flex justify-center items-center'>
                    <EllipsisVerticalIcon className='w-4' />
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem
                      className='p-0'
                      onClick={() =>
                        navigate(`${PATHS.DASHBOARD_RESUME}?id=${resume.id}`)
                      }
                    >
                      <button className='h-fit w-full py-1 px-1.5 rounded hover:bg-blue-100 text-gray-500 hover:text-blue-500 cursor-pointer flex items-center gap-1.5'>
                        <PencilIcon className='w-4' />
                        <p>Edit</p>
                      </button>
                    </MenubarItem>
                    {resume.status == 'PUBLIC' ? (
                      <MenubarItem className='p-0'>
                        <button
                          className='h-fit w-full py-1 px-1.5 rounded hover:bg-orange-100 text-gray-500 hover:text-orange-500 cursor-pointer flex items-center gap-1.5'
                          onClick={async () => {
                            try {
                              const url = `${BASE_URL}/cv/${resume.id}`
                              await navigator.clipboard.writeText(url)
                              toast.success('Copied! Share the link anywhere.')
                            } catch (error) {
                              toast.error(error)
                            }
                          }}
                        >
                          <ForwardIcon className='w-4' />
                          <p>Share</p>
                        </button>
                      </MenubarItem>
                    ) : (
                      <MenubarItem
                        className='p-0'
                        onClick={() =>
                          navigate(`${PATHS.DASHBOARD}?publish=${resume.id}`)
                        }
                      >
                        <button className='h-fit w-full py-1 px-1.5 rounded hover:bg-orange-100 text-gray-500 hover:text-orange-500 cursor-pointer flex items-center gap-1.5'>
                          <Eye className='w-4' />
                          <p>Publish</p>
                        </button>
                      </MenubarItem>
                    )}

                    <MenubarItem
                      className='p-0'
                      onClick={() =>
                        navigate(`${PATHS.DASHBOARD}?delete=${resume.id}`)
                      }
                    >
                      <button className='h-fit w-full py-1 px-1.5 rounded hover:bg-red-100 text-gray-500 hover:text-red-500 cursor-pointer flex items-center gap-1.5'>
                        <Trash className='w-4' />
                        <p>Delete</p>
                      </button>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
