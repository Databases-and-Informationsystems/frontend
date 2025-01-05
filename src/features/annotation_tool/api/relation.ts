import axios from 'axios'
import { Relation } from '../types'

const BASE_URL = 'http://localhost:3000/relations'

export const fetchRelations = async (): Promise<Relation[]> => {
  try {
    const response = await axios.get(BASE_URL)
    return response.data
  } catch (error) {
    console.error('Failed to fetch relations:', error)
    return []
  }
}

export const createRelation = async (relation: Relation) => {
  try {
    const response = await axios.post(BASE_URL, relation)
    return response.data
  } catch (error) {
    console.error('Failed to create relation:', error)
    throw error
  }
}

export const updateRelation = async (
  relationId: string,
  updatedRelation: Relation
) => {
  try {
    const response = await axios.put(`${BASE_URL}/${relationId}`, updatedRelation)
    return response.data
  } catch (error) {
    console.error(`Failed to update relation with ID ${relationId}:`, error)
    throw error
  }
}

export const deleteRelation = async (relationId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${relationId}`)
    return response.data
  } catch (error) {
    console.error(`Failed to delete relation with ID ${relationId}:`, error)
    throw error
  }
}