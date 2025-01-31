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
  modelsByStepEnum: ModelsByModelStep,
  modelByStepType: Record<ModelStepEnum, string | undefined>,
  settingsByModel: Record<ModelStepEnum, Record<string, string>>
): Promise<DocumentEdit> => {
  // TODO this could be way simpler with a more generic endpoint
  const model_mention_id = modelsByStepEnum[ModelStepEnum.mention].find(
    (m) => m.model_type === modelByStepType[ModelStepEnum.mention]
  )?.id
  const model_relation_id = modelsByStepEnum[ModelStepEnum.relation].find(
    (m) => m.model_type === modelByStepType[ModelStepEnum.relation]
  )?.id
  const model_entities_id = modelsByStepEnum[ModelStepEnum.entity].find(
    (m) => m.model_type === modelByStepType[ModelStepEnum.entity]
  )?.id

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
