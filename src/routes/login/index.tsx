import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginSchema } from './schema'

export default function Page() {
  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  return <div></div>
}
