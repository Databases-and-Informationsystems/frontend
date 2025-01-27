import axiosInstance from '@/lib/axios'
import {
  NewConstraint,
  Schema,
  SchemaMention,
  SchemaRelation,
} from '../types/types'
import { Team } from '@/features/dashboard/types/types'

export const getSchema = async (id: number): Promise<Schema> => {
  const response = await axiosInstance.get<Schema>(`/schemas/${id}`)
  return response.data
}
