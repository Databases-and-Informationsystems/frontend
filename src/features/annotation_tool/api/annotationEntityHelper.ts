import axios from 'axios'
import { AnnotationEntity } from '../types'

const BASE_URL = 'http://localhost:3000/entities'

export const fetchEntities = async (): Promise<AnnotationEntity[]> => {
  try {
    const response = await axios.get(BASE_URL)
    return response.data
  } catch (error) {
    console.error('Failed to fetch mentions:', error)
    return []
  }
}

export const createEntity = async (entity: AnnotationEntity) => {
  try {
    const response = await axios.post(BASE_URL, entity)
    return response.data
  } catch (error) {
    console.error('Failed to create entity:', error)
    throw error
  }
}

export const updateEntity = async (entityId: string, updatedEntity: AnnotationEntity) => {
  try {
    const response = await axios.put(`${BASE_URL}/${entityId}`, updatedEntity)
    console.log("Updated Entity: ", response.data);
    return response.data
  } catch (error) {
    console.error(`Failed to update entity with ID ${entityId}:`, error)
    throw error
  }
}

export const deleteEntity = async (entityId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${entityId}`)
    console.log("Deleted Entity: ", response.data);
    return response.data
  } catch (error) {
    console.error(`Failed to delete entity with ID ${entityId}:`, error)
    throw error
  }
}
