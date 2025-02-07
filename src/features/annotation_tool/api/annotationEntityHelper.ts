import { AnnotationEntity } from '../types'
import axiosInstance from '@/lib/axios.ts'

export const fetchEntities = async (document_edit_id: number | string): Promise<AnnotationEntity[]> => {
  try {
    const response = await axiosInstance.get(`/entities/${document_edit_id}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch mentions:', error)
    return []
  }
}

export type EntityCreationPayload = {
  document_edit_id: number;
  mention_ids: number[];
}

export const createEntity = async (entity: EntityCreationPayload) => {
  try {
    const response = await axiosInstance.post('/entities', entity)
    return response.data
  } catch (error) {
    console.error('Failed to create entity:', error)
    throw error
  }
}

export const deleteEntity = async (entityId: number) => {
  try {
    console.log("%cDelete 2 reached", "color: red")
    const response = await axiosInstance.delete(`/entities/${entityId}`)
    console.log("Deleted Entity: ", response.data);
    return response.data
  } catch (error) {
    console.error(`Failed to delete entity with ID ${entityId}:`, error)
    throw error
  }
}
