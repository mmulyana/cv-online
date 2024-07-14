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
import { useForm } from 'react-hook-form'
import { basicSchema } from './schema'
import { z } from 'zod'
import { useAtom } from 'jotai'
import { resumeAtom } from '../..'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

const DEFAULT_VALUES = {
  name: '',
  address: '',
  description: '',
  email: '',
  linkedin: '',
  phone: '',
  photo: '',
  portfolio: '',
}

export function BasicForm() {
  const form = useForm<z.infer<typeof basicSchema>>({
    resolver: zodResolver(basicSchema),
    defaultValues: {
      name: 'Muhamad Mulyana',
      address: 'Purwakarta',
      description: 'Junior Frontend Developer',
      email: 'mulyan.t20@gmail.com',
      linkedin: 'https://www.linkedin.com/in/mmulyana/',
      phone: '087879824426',
      photo: '',
      portfolio: 'https://mmulyana.vercel.app/',
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
