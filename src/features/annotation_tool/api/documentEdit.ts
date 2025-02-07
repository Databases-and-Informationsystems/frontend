import axiosInstance from '@/lib/axios'
import { DocumentEdit } from '../types/documentEdit'

export const fetchDocumentEdit = async (
  documentEditId: number
): Promise<DocumentEdit> => {
  const response = await axiosInstance.get(`/document_edits/${documentEditId}`)
  return response.data
}
