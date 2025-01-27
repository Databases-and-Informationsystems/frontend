import axiosInstance from '@/lib/axios'
import { Mention } from '../types'

export const fetchMentions = async (
  documentEditId: string
): Promise<Mention[]> => {
  const response = await axiosInstance.get(`/mentions/${documentEditId}`)
  return response.data.mentions
}

export const createMention = async (mention: Mention): Promise<Mention> => {
  const response = await axiosInstance.post('/mentions', mention)
  return response.data
}

export const updateMention = async (
  mentionId: string,
  updatedMention: Mention
): Promise<Mention> => {
  const response = await axiosInstance.patch(
    `/mentions/${mentionId}`,
    updatedMention
  )
  return response.data
}

export const deleteMention = async (mentionId: string): Promise<void> => {
  await axiosInstance.delete(`/mentions/${mentionId}`)
}

export const acceptMentionSuggestion = async (
  mentionId: string
): Promise<Mention> => {
  const response = await axiosInstance.post(`/mentions/${mentionId}/accept`)
  return response.data
}

export const rejectMentionSuggestion = async (
  mentionId: string
): Promise<void> => {
  await axiosInstance.post(`/mentions/${mentionId}/reject`)
}
