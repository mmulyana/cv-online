import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginSchema } from './schema'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { Link } from 'react-router-dom'
import { PATHS } from '@/constant/_paths'

export default function Page() {
  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const submit = (data: z.infer<typeof loginSchema>) => {
    console.log(data)
  }

  return (
    <div>
      <Card className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[400px] w-full'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submit)}
              className='flex flex-col gap-4'
            >
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
              <Button className='mt-4' type='submit'>
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <span>
            Dont have an account? register <Link className='underline' to={PATHS.REGISTER}>here</Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  )
}
