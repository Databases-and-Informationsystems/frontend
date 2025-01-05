import axios from 'axios'
import { Mention } from '../types'

const BASE_URL = 'http://localhost:3000/mentions'

export const fetchMentions = async (): Promise<Mention[]> => {
  try {
    const response = await axios.get(BASE_URL)
    return response.data
  } catch (error) {
    console.error('Failed to fetch mentions:', error)
    return []
  }
}

export const createMention = async (mention: Mention) => {
  try {
    const response = await axios.post(BASE_URL, mention)
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
    const response = await axios.put(`${BASE_URL}/${mentionId}`, updatedMention)
    return response.data
  } catch (error) {
    console.error(`Failed to update mention with ID ${mentionId}:`, error)
    throw error
  }
}

export const deleteMention = async (mentionId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${mentionId}`)
    return response.data
  } catch (error) {
    console.error(`Failed to delete mention with ID ${mentionId}:`, error)
    throw error
  }
}
