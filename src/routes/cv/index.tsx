import CV from '@/components/cv'
import { useGetPublishResume } from '@/hooks/api/use-resume'
import { useParams } from 'react-router-dom'

export default function Page() {
  const { id } = useParams()

  const { isLoading, data } = useGetPublishResume(Number(id))

  if (isLoading) return <p>Loading</p>

  return (
    <>
      <div className='fixed -z-10 top-0 left-0 h-full w-full bg-[#f5f5f5]'></div>
      <div className='px-4 mx-auto bg-white max-w-4xl mt-4'>
        <CV data={data?.data?.data} styleId={Number(data?.data?.data?.design || 1)} />
      </div>
    </>
  )
}
