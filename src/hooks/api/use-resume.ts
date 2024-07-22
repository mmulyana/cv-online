import { Resume } from '@/types/resume'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import {
  createResumeFetcher,
  getResumeByIdFetcher,
  getResumesFetcher,
  updateResumeFetcher,
} from './fetcher/resume'
import { toast } from 'sonner'
import { KEYS } from '@/constant/_keys'

type Response = {
  data: string
  error: string
}

export type createPayload = Partial<Resume>
export type updatePayload = Partial<Resume> & {
  id: number
}

export const useCreateResume = () => {
  const queryClient = useQueryClient()

  return useMutation<AxiosResponse<Response>, Error, createPayload>({
    mutationFn: createResumeFetcher,
    onError: (err) => {
      toast.error(err.message)
    },
    onSuccess: (data) => {
      toast.success(data.data.data)
      queryClient.invalidateQueries({ queryKey: [KEYS.RESUME] })
    },
  })
}

export const useUpdateResume = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation<AxiosResponse<Response>, Error, updatePayload>({
    mutationFn: updateResumeFetcher,
    onError: (err) => {
      toast.error(err.message)
    },
    onSuccess: (data) => {
      toast.success(data.data.data)
      queryClient.invalidateQueries({ queryKey: [KEYS.RESUME, id] })
    },
  })
}

export const useResumes = () => {
  return useQuery({
    queryFn: getResumesFetcher,
    queryKey: [KEYS.RESUME],
  })
}

export const useResumeById = (id: number) => {
  return useQuery({
    queryFn: () => getResumeByIdFetcher(id),
    queryKey: [KEYS.RESUME, id],
  })
}
