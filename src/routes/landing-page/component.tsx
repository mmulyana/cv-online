import { buttonVariants } from '@/components/ui/button'
import { PATHS } from '@/constant/_paths'
import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <div className='fixed top-0 left-0 w-full py-6 px-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <p className='text-lg text-primary font-semibold'>CV Online</p>
        <div className='flex gap-4 items-center'>
          <Link
            className={buttonVariants({ variant: 'default' })}
            to={PATHS.LOGIN}
          >
            Login
          </Link>
          <Link
            className={buttonVariants({ variant: 'outline' })}
            to={PATHS.REGISTER}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
