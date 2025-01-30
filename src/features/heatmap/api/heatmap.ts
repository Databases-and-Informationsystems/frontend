import axiosInstance from '@/lib/axios'
import { HeatmapResponse } from '../types/heatmap'

export const getHeatmapOfDocument = async (
  documentId: number
): Promise<HeatmapResponse> => {
  const response = await axiosInstance.get<HeatmapResponse>(
    `/documents/${documentId}/heatmap`
  )
  return response.data
}
