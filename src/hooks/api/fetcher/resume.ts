import http from '@/utils/http'
import { createPayload, updatePayload } from '../use-resume'
import { URLS } from '@/constant/_urls'

export const createResumeFetcher = async (payload: createPayload) => {
  return await http.post(URLS.RESUME, payload)
}

export const updateResumeFetcher = async (payload: updatePayload) => {
  return await http.put(`${URLS.RESUME}/${payload.id}`, payload)
}

export const getResumesFetcher = async () => {
  return await http(URLS.RESUME)
}

export const getResumeByIdFetcher = async (id: number) => {
  return await http(`${URLS.RESUME}/${id}`)
}

export const getPublishResumeByIdFetcher = async (id: number) => {
  return await http(`${URLS.RESUME}/publish/${id}`)
}

export const deleteResumeFetcher = async ({ id }: { id: number }) => {
  return await http.delete(`${URLS.RESUME}/${id}`)
}

export const publishResumeFetcher = async ({ id }: { id: number }) => {
  return await http.patch(`${URLS.RESUME}/publish/${id}`)
}

export const getPublicResumeFetcher = async ({ id }: { id: number }) => {
  return await http(`${URLS.RESUME}/publish/${id}`)
}
