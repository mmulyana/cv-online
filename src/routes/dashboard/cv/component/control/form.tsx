import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { basicSchema, educationSchema } from './schema'
import { z } from 'zod'
import { useAtom } from 'jotai'
import { resumeAtom } from '../..'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export function BasicForm() {
  const form = useForm<z.infer<typeof basicSchema>>({
    resolver: zodResolver(basicSchema),
    defaultValues: {
      name: 'Example Name',
      address: 'City',
      description: 'Description',
      email: 'Your email',
      linkedin: '',
      phone: '',
      photo: '',
      portfolio: '',
    },
  })

  const [resume, setResume] = useAtom(resumeAtom)

  useEffect(() => {
    const data = form.watch()
    setResume({ ...data })

    const subscription = form.watch((data: Record<string, string>) => {
      setResume({ ...resume, ...data })
    })

    return () => subscription.unsubscribe()
  }, [form.watch])

  const onSubmit = (data: z.infer<typeof basicSchema>) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4 px-3'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input placeholder='example@mail.com' {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='linkedin'
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='portfolio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website or portfolio</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type='submit' className='mt-2'>
          Save
        </Button>
      </form>
    </Form>
  )
}

export function EducationForm() {
  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: [
        {
          title: '',
          school: '',
          description: '',
          start_date: '',
          end_date: '',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'educations',
    control: form.control,
  })

  // const [resume, setResume] = useAtom(resumeAtom)
  // useEffect(() => {
  //   const data = form.watch()
  //   const subscription = form.watch((data: Record<string, string>) => {
  //     setResume({ ...resume, ...data })
  //   })
  //   return () => subscription.unsubscribe()
  // }, [form.watch])

  const onSubmit = (data: z.infer<typeof educationSchema>) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4 px-3'
      >
        <FormLabel className='text-xs text-gray-400'>Educations</FormLabel>
        {fields.map((field, index) => (
          <div key={index} className='flex flex-col gap-2'>
            <div>
              <FormLabel
                htmlFor={`educations.${index}.title`}
                className='text-xs font-normal text-gray-500'
              >
                Title
              </FormLabel>
              <Input
                placeholder='title'
                {...form.register(`educations.${index}.title`)}
              />
            </div>
            <div>
              <FormLabel
                htmlFor={`educations.${index}.school`}
                className='text-xs font-normal text-gray-500'
              >
                School
              </FormLabel>
              <Input
                placeholder='school'
                {...form.register(`educations.${index}.school`)}
              />
            </div>
            <div>
              <FormLabel
                htmlFor={`educations.${index}.description`}
                className='text-xs font-normal text-gray-500'
              >
                Description
              </FormLabel>
              <Textarea
                placeholder='description'
                {...form.register(`educations.${index}.description`)}
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <FormLabel
                  htmlFor={`educations.${index}.start_date`}
                  className='text-xs font-normal text-gray-500'
                >
                  Start Date
                </FormLabel>
                <Input
                  type='date'
                  className='w-full'
                  {...form.register(`educations.${index}.start_date`)}
                />
              </div>
              <div>
                <FormLabel
                  htmlFor={`educations.${index}.end_date`}
                  className='text-xs font-normal text-gray-500'
                >
                  End Date
                </FormLabel>
                <Input
                  className='w-full'
                  type='date'
                  {...form.register(`educations.${index}.end_date`)}
                />
              </div>
            </div>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={() => remove(index)}
            >
              <span className='text-xs'>Hapus</span>
            </Button>
          </div>
        ))}
        <div>
          <Button
            type='button'
            variant='secondary'
            size='sm'
            onClick={() =>
              append({
                title: '',
                description: '',
                school: '',
                start_date: '',
                end_date: '',
              })
            }
          >
            Tambah
          </Button>
        </div>
        <Button type='submit' className='mt-2'>
          Save
        </Button>
      </form>
    </Form>
  )
}
