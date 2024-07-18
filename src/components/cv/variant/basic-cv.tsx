import { Resume } from '@/routes/dashboard/cv'
import { formatDates } from '@/utils/date'
import { format } from 'date-fns'

type Props = {
  data: Resume | null
}
export default function BasicCV({ data }: Props) {
  return (
    <div className='p-4'>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-2xl'>{data?.name ?? 'Your name'}</p>
          <p className='text-gray-500'>{data?.description ?? 'description'}</p>
        </div>
        <p>{data?.address ?? 'address'}</p>
      </div>
      <div className='flex justify-between items-center gap-4 mt-4'>
        <span className='text-xs'>
          {data?.contact?.email ?? 'example@mail.com'}
        </span>
        <span className='text-xs'>
          {data?.contact?.phone ?? 'phone number'}
        </span>
        {!!data?.contact?.portofolioWeb && (
          <span className='text-xs'>{data?.contact.portofolioWeb}</span>
        )}
      </div>
      <hr className='w-full border border-gray-100 mt-2' />
      <div className='border-b border-gray-200 pb-0.5 mt-3 text-xs'>
        Experience
      </div>
      {data?.experience?.map((exp, index) => (
        <div key={index} className='mt-1.5'>
          <div className='flex justify-between items-center relative'>
            {!!exp?.title && (
              <p className='text-sm text-gray-600'>{exp.title}</p>
            )}
            {!!exp?.company && (
              <a
                href={exp.link ?? '#'}
                className='absolute left-1/2 -translate-x-1/2 text-sm text-gray-800'
              >
                {exp.company}
              </a>
            )}
            {(!!exp?.start_date || !!exp?.end_date) && (
              <div className='flex gap-2 text-sm text-gray-400'>
                {format(exp.start_date, 'd MMM yy')}
              </div>
            )}
          </div>
          {!!exp?.description && (
            <p className='text-xs text-gray-400'>{exp.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}
