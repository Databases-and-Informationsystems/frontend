import axiosInstance from '@/lib/axios'
import { Mention } from '../types'
import { CreateMentionPayload } from '../types/mention'

export const fetchMentions = async (
  documentEditId: string
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
  updatedMention: Mention
): Promise<Mention> => {
  const response = await axiosInstance.patch(
    `/mentions/${mentionId}`,
    updatedMention
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
