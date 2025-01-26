import axiosInstance from '@/lib/axios'
import { Schema } from '../types/types'


export const getSchema = async (id: number) : Promise<Schema> => {
  const response = await axiosInstance.get<Schema>(`/schemas/${id}`)
  return response.data
}
