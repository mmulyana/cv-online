import { buttonVariants } from '@/components/ui/button'
import { PATHS } from '@/constant/_paths'
import { Link } from 'react-router-dom'
import Layout from './layout'

export default function Page() {
  return (
    <Layout>
      <div className='pt-4'>
        <div className='h-[80dvh] w-full flex justify-center items-center'>
          <Link
            className={buttonVariants({ variant: 'default' })}
            to={PATHS.DASHBOARD_RESUME}
          >
            Buat CV
          </Link>
        </div>
      </div>
    </Layout>
  )
}
