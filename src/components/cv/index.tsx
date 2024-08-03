import { Resume } from '@/types/resume'
import BasicCV from './variant/basic-cv'
import Basic2CV from './variant/basic2-cv'

type Props = {
  styleId: number
  data: Resume | null
}
export default function CV({ styleId = 1, ...props }: Props) {
  const cvStyle: Record<number, React.ReactNode> = {
    1: <BasicCV data={props.data} />,
    2: <Basic2CV data={props.data} />,
  }

  return <>{cvStyle?.[styleId]}</>
}
