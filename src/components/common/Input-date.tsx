import { Control, Controller } from 'react-hook-form'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { cn } from '@/utils/cn'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '../ui/calendar'

type Props = {
  name: string
  control: Control
  index: number
  handleSelect: (...param: any) => void
  type?: string
  placeholder?: string
}
export default function InputDate({
  name,
  control,
  index,
  handleSelect,
  type = 'start_date',
  placeholder = 'Pick a date',
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value } }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                !value && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {value ? (
                format(new Date(value), 'PPP')
              ) : (
                <span>{placeholder}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={value ? new Date(value) : undefined}
              onSelect={(e) => handleSelect(index, e, type)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}
    />
  )
}
