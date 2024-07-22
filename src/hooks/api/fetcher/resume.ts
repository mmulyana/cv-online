import http from '@/utils/http'
import { createPayload, updatePayload } from '../use-resume'
import { URLS } from '@/constant/_urls'

export const createResumeFetcher = async (payload: createPayload) => {
  return await http.post(URLS.RESUME, payload)
}

export const updateResumeFetcher = async (payload: updatePayload) => {
  return await http.post(`${URLS.RESUME}/${payload.id}`, payload)
}

export const getResumesFetcher = async () => {
  return await http(URLS.RESUME)
}

export const getResumeByIdFetcher = async (id: number) => {
  return await http(`${URLS.RESUME}/${id}`)
}
