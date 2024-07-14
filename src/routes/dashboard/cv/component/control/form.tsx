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

export function BasicForm() {
  const form = useForm<z.infer<typeof basicSchema>>({
    resolver: zodResolver(basicSchema),
    defaultValues: {
      name: '',
      address: '',
      description: '',
      email: '',
      linkedin: '',
      phone: '',
      photo: '',
      portfolio: '',
    },
  })

  const [resume, setResume] = useAtom(resumeAtom)

  useEffect(() => {
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
        className='flex flex-col gap-6'
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
      </form>
    </Form>
  )
}
