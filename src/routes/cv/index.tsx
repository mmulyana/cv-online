import { useGetPublishResume } from '@/hooks/api/use-resume'
import { useParams } from 'react-router-dom'

export default function Page() {
  const { id } = useParams()

  const { isLoading, data } = useGetPublishResume(Number(id))

  if (isLoading) return <p>Loading</p>

  return <div>{data?.data?.data?.name || '-'}</div>
}
