import axiosInstance from '@/lib/axios.ts'
import { Mention } from '../types'

const BASE_URL = '/mentions'
const doc_edit_id = 1 //TODO get actual value

export const fetchMentions = async (): Promise<Mention[]> => {
  try {
    const response = await axiosInstance.get(BASE_URL+`/${doc_edit_id}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch mentions:', error)
    return []
  }
}

export const createMention = async (mention: Mention) => {
  try {
    const response = await axiosInstance.post(BASE_URL, mention)
    return response.data
  } catch (error) {
    console.error('Failed to create mention:', error)
    throw error
  }
}

export const updateMention = async (
  mentionId: string,
  updatedMention: Mention
) => {
  try {
    const response = await axiosInstance.put(`${BASE_URL}/${mentionId}`, updatedMention)
    return response.data
  } catch (error) {
    console.error(`Failed to update mention with ID ${mentionId}:`, error)
    throw error
  }
}

export const deleteMention = async (mentionId: string) => {
  try {
    const response = await axiosInstance.delete(`${BASE_URL}/${mentionId}`)
    return response.data
  } catch (error) {
    console.error(`Failed to delete mention with ID ${mentionId}:`, error)
    throw error
  }
}
