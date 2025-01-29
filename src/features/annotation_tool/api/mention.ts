import axiosInstance from '@/lib/axios'
import { Mention } from '../types'
import { CreateMentionPayload, UpdateMentionPayload } from '../types/mention'

export const fetchMentions = async (
  documentEditId: number
): Promise<Mention[]> => {
  const response = await axiosInstance.get(`/mentions/${documentEditId}`)
  return response.data.mentions
}

export const createMention = async (payload: CreateMentionPayload): Promise<Mention> => {
  const response = await axiosInstance.post('/mentions', payload)
  return response.data
}

export const updateMention = async (
  mentionId: number,
  payload: UpdateMentionPayload
): Promise<Mention> => {
  const response = await axiosInstance.patch(
    `/mentions/${mentionId}`,
    payload
  )
  return response.data
}

export const deleteMention = async (mentionId: number): Promise<void> => {
  await axiosInstance.delete(`/mentions/${mentionId}`)
}

export const acceptMentionSuggestion = async (
  mentionId: number
): Promise<Mention> => {
  const response = await axiosInstance.post(`/mentions/${mentionId}/accept`)
  return response.data
}

export const rejectMentionSuggestion = async (
  mentionId: number
): Promise<void> => {
  await axiosInstance.post(`/mentions/${mentionId}/reject`)
}
