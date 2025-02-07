import axiosInstance from '@/lib/axios'
import { ModelsByModelStep, ModelStepEnum } from '../types/models'
import { DocumentEdit } from '@/types/document'

export const getModelsBySchema = async (
  schemaId: number
): Promise<ModelsByModelStep> => {
  const response = await axiosInstance.get<ModelsByModelStep>(
    `/schemas/${schemaId}/recommendation`
  )
  return response.data
}

export const createDocumentEdit = async (
  documentId: number,
  recommendationModelIdByStepType: Record<ModelStepEnum, string | undefined>,
  settingsByModel: Record<ModelStepEnum, Record<string, string>>
): Promise<DocumentEdit> => {
  // TODO this could be way simpler with a more generic endpoint
  const model_mention_id = Number(
    recommendationModelIdByStepType[ModelStepEnum.mention]
  )
  const model_relation_id = Number(
    recommendationModelIdByStepType[ModelStepEnum.relation]
  )
  const model_entities_id = Number(
    recommendationModelIdByStepType[ModelStepEnum.entity]
  )

  if (!model_mention_id || !model_relation_id || !model_entities_id) {
    return Promise.reject(
      'Could not find model for mention, relation or entity.'
    )
  }

  const response = await axiosInstance.post<DocumentEdit>(`/document_edits`, {
    document_id: documentId,
    model_mention_id: model_mention_id,
    model_settings_mention:
      Object.keys(settingsByModel[ModelStepEnum.mention]).map((k) => {
        return {
          key: k,
          value: settingsByModel[ModelStepEnum.mention][k],
        }
      }) ?? [],
    model_relation_id: model_relation_id,
    model_settings_relation:
      Object.keys(settingsByModel[ModelStepEnum.relation]).map((k) => {
        return {
          key: k,
          value: settingsByModel[ModelStepEnum.relation][k],
        }
      }) ?? [],
    model_entities_id: model_entities_id,
    model_settings_entities:
      Object.keys(settingsByModel[ModelStepEnum.entity]).map((k) => {
        return {
          key: k,
          value: settingsByModel[ModelStepEnum.entity][k],
        }
      }) ?? [],
  })
  return response.data
}
