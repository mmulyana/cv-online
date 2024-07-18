import { Resume } from '@/routes/dashboard/cv'
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
      <div className='grid grid-cols-3 gap-4 mt-4'>
        <span className='text-xs'>
          {data?.contact?.email ?? 'example@mail.com'}
        </span>
        <span className='text-xs text-center'>
          {data?.contact?.portofolioWeb ?? ''}
        </span>
        <span className='text-xs text-right'>
          {data?.contact?.phone ?? 'phone number'}
        </span>
      </div>
      <div className='border-b border-gray-200 pb-0.5 mt-3 text-xs'>
        Experience
      </div>
      {data?.experience?.map((exp, index) => (
        <div key={index} className='mt-1.5'>
          <div className='grid grid-cols-3 gap-2 relative'>
            {!!exp?.title && (
              <p className='text-sm text-gray-600'>{exp.title}</p>
            )}
            {!!exp?.company && (
              <a
                href={exp.link ?? '#'}
                className='text-sm text-center text-gray-800'
              >
                {exp.company}
              </a>
            )}
            <div className='flex justify-end gap-2 text-xs text-gray-400'>
              {!!exp?.start_date && <>{format(exp.start_date, 'd MMM yy')}</>}
              {' - '}
              {!!exp?.end_date && <>{format(exp.end_date, 'd MMM yy')}</>}
            </div>
          </div>
          {!!exp?.description && (
            <p className='text-xs text-gray-400'>{exp.description}</p>
          )}
        </div>
      ))}
      <div className='border-b border-gray-200 pb-0.5 mt-3 text-xs'>
        Education
      </div>
      {data?.education?.map((item, index) => (
        <div key={index} className='mt-1.5'>
          <div className='grid grid-cols-3 relative'>
            {!!item?.title && (
              <p className='text-sm text-gray-600'>{item.title}</p>
            )}
            {!!item?.school && (
              <p className='text-sm text-gray-800 text-center'>{item.school}</p>
            )}
            <div className='flex justify-end gap-2 text-xs text-gray-400'>
              {!!item?.start_date && <>{format(item.start_date, 'd MMM yy')}</>}
              {' - '}
              {!!item?.end_date && <>{format(item.end_date, 'd MMM yy')}</>}
            </div>
          </div>
          {!!item?.description && (
            <p className='text-xs text-gray-400'>{item.description}</p>
          )}
        </div>
      ))}
      <div className='border-b border-gray-200 pb-0.5 mt-3 text-xs'>
        Portfolios
      </div>
      {data?.portfolio?.map((item: any, index) => (
        <div key={index} className='mt-1.5'>
          <div className='flex justify-between items-center relative'>
            <div>
              {!!item?.title && (
                <a href={item.link} className='text-sm text-gray-800'>
                  {item.title}
                </a>
              )}
              {!!item?.role && (
                <p className='text-xs text-center text-gray-600'>{item.role}</p>
              )}
            </div>
            <div className='flex justify-end gap-2 text-xs text-gray-400'>
              {!!item?.start_date && <>{format(item.start_date, 'd MMM yy')}</>}
              {' - '}
              {!!item?.end_date && <>{format(item.end_date, 'd MMM yy')}</>}
            </div>
          </div>
          {!!item?.description && (
            <p className='text-xs text-gray-400'>{item.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}
