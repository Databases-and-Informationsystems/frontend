import { Document, DocumentEdit } from '@/types/document'
export interface HeatmapToken {
  id: number
  text: string
  document_index: number
  sentence_index: number
  pos_tag: string
  score?: number
}

export interface HeatmapResponse {
  items: HeatmapToken[]
  document: Pick<Document, 'id' | 'name'>
  document_edits: Required<Pick<DocumentEdit, 'id' | 'user'>>[]
}
