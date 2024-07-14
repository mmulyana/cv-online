type Props = {
  data: any
}
export default function Basic2CV({ data }: Props) {
  return (
    <div className='p-4'>
      <div className='text-center'>
        <p className='text-2xl'>{data?.name}</p>
        <p className='text-gray-500'>{data?.description}</p>
      </div>
      <div className='flex justify-between items-center gap-4 mt-4'>
        <span className='text-xs'>{data?.email}</span>
        <span className='text-xs'>{data?.phone}</span>
        <span className='text-xs'>{data?.portfolio}</span>
      </div>
      <hr className='w-full border border-gray-100 mt-2' />
    </div>
  )
}
