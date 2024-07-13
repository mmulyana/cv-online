import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { registerFirstSchema, registerSecondSchema } from './schema'
import { useAtomValue, useSetAtom } from 'jotai'
import { dataAtom, stepAtom } from '.'
import { useNavigate } from 'react-router-dom'

export function FirstForm() {
  const form = useForm<z.infer<typeof registerFirstSchema>>({
    defaultValues: {
      email: '',
      username: '',
    },
  })

  const setStep = useSetAtom(stepAtom)
  const setData = useSetAtom(dataAtom)

  const submit = (data: z.infer<typeof registerFirstSchema>) => {
    setData(data)
    setStep('second')
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <div>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='example@mail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-4' type='submit'>
          Next
        </Button>
      </form>
    </Form>
  )
}

export function SecondForm() {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof registerSecondSchema>>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const setStep = useSetAtom(stepAtom)
  const prevData = useAtomValue(dataAtom)

  const onPrev = () => setStep('first')

  const submit = (data: z.infer<typeof registerSecondSchema>) => {
    const payload = {
      ...prevData,
      ...data,
    }
    console.log(payload)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mt-4 flex gap-4'>
          <Button type='button' variant='secondary' onClick={onPrev}>
            Back
          </Button>
          <Button type='submit' className='flex-1'>
            Register
          </Button>
        </div>
      </form>
    </Form>
  )
}
