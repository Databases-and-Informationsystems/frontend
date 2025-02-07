import { DocumentEditStateType, DocumentStateType } from '@/types/document'

export const translateDocumentState = (state: DocumentStateType): string => {
  switch (state) {
    case DocumentStateType.NEW:
      return 'New'
    case DocumentStateType.IN_PROGRESS:
      return 'In Progess'
    case DocumentStateType.FINISHED:
      return 'Finished'
  }
}

export const translateDocumentEditState = (
  state: DocumentEditStateType
): string => {
  switch (state) {
    case DocumentEditStateType.MENTION_SUGGESTION:
      return 'Mention Suggestion'
    case DocumentEditStateType.MENTIONS:
      return 'Mentions'
    case DocumentEditStateType.RELATION_SUGGESTION:
      return 'Relation Suggestions'
    case DocumentEditStateType.RELATIONS:
      return 'Relations'
    case DocumentEditStateType.ENTITIES:
      return 'Entities'
    case DocumentEditStateType.FINISHED:
      return 'Finished'
  }
}
