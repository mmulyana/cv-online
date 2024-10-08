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
import { zodResolver } from '@hookform/resolvers/zod'
import { PayloadAuth, useAuth } from '@/hooks/api/use-auth'

export function FirstForm() {
  const form = useForm<z.infer<typeof registerFirstSchema>>({
    resolver: zodResolver(registerFirstSchema),
    defaultValues: {
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
        className='flex flex-col gap-6'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button className='mt-4' type='submit'>
          Continue
        </Button>
      </form>
    </Form>
  )
}

export function SecondForm() {
  const { register } = useAuth()
  const form = useForm<z.infer<typeof registerSecondSchema>>({
    resolver: zodResolver(registerSecondSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const setStep = useSetAtom(stepAtom)
  const prevData = useAtomValue(dataAtom)

  const onPrev = () => setStep('first')

  const submit = (data: z.infer<typeof registerSecondSchema>) => {
    const payload: PayloadAuth = {
      username: prevData.username,
      password: data.password,
    }
    register(payload)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className='flex flex-col gap-6'
      >
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </div>
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
