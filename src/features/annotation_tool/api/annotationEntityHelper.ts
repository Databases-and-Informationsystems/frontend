import { AnnotationEntity } from '../types'
import axiosInstance from '@/lib/axios.ts'

//const BASE_URL = 'http://localhost:3000/entities'

export const fetchEntities = async (document_edit_id: number | string): Promise<AnnotationEntity[]> => {
  try {
    const response = await axiosInstance.get(`/entities/${document_edit_id}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch mentions:', error)
    return []
  }
}

export const createEntity = async (entity: AnnotationEntity) => {
  try {
    const response = await axiosInstance.post("/entities/", entity)
    return response.data
  } catch (error) {
    console.error('Failed to create entity:', error)
    throw error
  }
}

export const updateEntity = async (entityId: string, updatedEntity: AnnotationEntity) => {
  try {

    const entityToUpdate = {
      ...updatedEntity,
      mention_ids: Array.isArray(updatedEntity.mention_ids) ? updatedEntity.mention_ids : Object.values(updatedEntity.mention_ids)
    };

    const response = await axiosInstance.put(`/entities/${entityId}`, entityToUpdate);
    console.log("Updated Entity: ", response.data);
    return response.data;
  } catch (error) {
    console.error(`Failed to update entity with ID ${entityId}:`, error);
    throw error;
  }
}


export const deleteEntity = async (entityId: string) => {
  try {
    const response = await axiosInstance.delete(`/entities/${entityId}`)
    console.log("Deleted Entity: ", response.data);
    return response.data
  } catch (error) {
    console.error(`Failed to delete entity with ID ${entityId}:`, error)
    throw error
  }
}
