import { Mention } from '@/features/annotation_tool/types/mention.ts'

export type AnnotationEntity = {
  id: number;
  isShownRecommendation: boolean;
  document_edit_id: number;
  document_recommendation_id: number;
  mentions: Array<Mention>;
}