import axiosInstance from '@/lib/axios'
import {
  CreateRelationPayload,
  Relation,
  UpdateRelationPayload,
} from '../types/relation'

export const fetchRelations = async (
  documentEditId: number
): Promise<Relation[]> => {
  const response = await axiosInstance.get(`/relations/${documentEditId}`)
  return response.data.relations
}

export const createRelation = async (
  payload: CreateRelationPayload
): Promise<Relation> => {
  const response = await axiosInstance.post('/relations', payload)
  return response.data
}

export const updateRelation = async (
  relationId: number,
  payload: UpdateRelationPayload
): Promise<Relation> => {
  const response = await axiosInstance.patch(
    `/relations/${relationId}`,
    payload
  )
  return response.data
}

export const deleteRelation = async (relationId: number): Promise<void> => {
  await axiosInstance.patch(`/relations/${relationId}`)
}

export const acceptRelationSuggestion = async (
  relationId: number
): Promise<Relation> => {
  const response = await axiosInstance.post(`/relations/${relationId}/accept`)
  return response.data
}

export const rejectRelationSuggestion = async (
  relationId: number
): Promise<void> => {
  await axiosInstance.post(`/relations/${relationId}/reject`)
}
