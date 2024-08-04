import { Resume } from '@/types/resume'
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
              {!!exp?.startDate && <>{format(exp.startDate, 'd MMM yy')}</>}
              {' - '}
              {!!exp?.endDate && <>{format(exp.endDate, 'd MMM yy')}</>}
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
              {!!item?.startDate && <>{format(item.startDate, 'd MMM yy')}</>}
              {' - '}
              {!!item?.endDate && <>{format(item.endDate, 'd MMM yy')}</>}
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
      {data?.portofolio?.map((item: any, index) => (
        <div key={index} className='mt-1.5'>
          <div className='flex justify-between items-center relative'>
            <div>
              {!!item?.title && (
                <a href={item.link} className='text-sm text-gray-800'>
                  {item.title}
                </a>
              )}
              {!!item?.role && (
                <p className='text-xs text-gray-600'>{item.role}</p>
              )}
            </div>
            <div className='flex justify-end gap-2 text-xs text-gray-400'>
              {!!item?.startDate && <>{format(item.startDate, 'd MMM yy')}</>}
              {' - '}
              {!!item?.endDate && <>{format(item.endDate, 'd MMM yy')}</>}
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
