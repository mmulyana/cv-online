import { PATHS } from '@/constant/_paths'
import { URLS } from '@/constant/_urls'
import { CookieKeys, CookieStorage } from '@/utils/cookie'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import { toast } from 'sonner'
import http from '@/utils/http'

export type PayloadAuth = {
  username?: string
  password?: string
}

type AuthResponse = {
  data: string
  error: string
}

const fetcherLogin = async (
  payload: PayloadAuth
): Promise<AxiosResponse<AuthResponse>> => {
  return await http.post(URLS.LOGIN, payload)
}
const fetcherRegister = async (
  payload: PayloadAuth
): Promise<AxiosResponse<AuthResponse>> => {
  return await http.post(URLS.REGISTER, payload)
}

export const useAuth = () => {
  const navigate = useNavigate()

  const { mutate: login } = useMutation({
    mutationFn: fetcherLogin,
    onSuccess: (data) => {
      CookieStorage.set(CookieKeys.AuthToken, data.data.data)
      toast.success('Login success')
      navigate(PATHS.DASHBOARD)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { mutate: register } = useMutation({
    mutationFn: fetcherRegister,
    onSuccess: (data) => {
      toast(data.data.data)
      navigate(PATHS.LOGIN)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { login, register }
}
