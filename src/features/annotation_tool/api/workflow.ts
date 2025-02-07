import axiosInstance from '@/lib/axios'
import { WorkflowResponse } from '../types/workflow'

export const updateWorkflowStep = async (
  documentEditID: number,
  state: string
): Promise<WorkflowResponse> => {
  const response = await axiosInstance.post(
    `/document_edits/${documentEditID}/step`,
    { state }
  )
  return response.data
}
