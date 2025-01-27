import axiosInstance from '@/lib/axios'
import { Relation } from '../types'

export const fetchRelations = async (
  documentEditId: string
): Promise<Relation[]> => {
  const response = await axiosInstance.get(`/relations/${documentEditId}`)
  return response.data.relations
}

export const createRelation = async (relation: Relation): Promise<Relation> => {
  const response = await axiosInstance.post('/relations', relation)
  return response.data
}

export const updateRelation = async (
  relationId: string,
  updatedRelation: Relation
): Promise<Relation> => {
  const response = await axiosInstance.patch(
    `/relations/${relationId}`,
    updatedRelation
  )
  return response.data
}

export const deleteRelation = async (relationId: string): Promise<void> => {
  await axiosInstance.patch(`/relations/${relationId}`)
}

export const acceptRelationSuggestion = async (
  relationId: string
): Promise<Relation> => {
  const response = await axiosInstance.post(`/relations/${relationId}/accept`)
  return response.data
}

export const rejectRelationSuggestion = async (
  relationId: string
): Promise<void> => {
  await axiosInstance.post(`/relations/${relationId}/reject`)
}
