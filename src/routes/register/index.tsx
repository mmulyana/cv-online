import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Link } from 'react-router-dom'
import { PATHS } from '@/constant/_paths'
import { atom, useAtom } from 'jotai'
import { FirstForm, SecondForm } from './component'

export const stepAtom = atom('first')
export const dataAtom = atom<Record<string, string>>({})

export default function Page() {
  const [step, setStep] = useAtom(stepAtom)

  const content: Record<string, React.ReactNode> = {
    first: <FirstForm />,
    second: <SecondForm />,
  }

  return (
    <div>
      <Card className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[400px] w-full'>
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>{content[step]}</CardContent>
        <CardFooter>
          <span>
            Already have an account? login{' '}
            <Link className='underline' to={PATHS.LOGIN}>
              here
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  )
}
