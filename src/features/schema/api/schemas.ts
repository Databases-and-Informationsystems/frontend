import axiosInstance from '@/lib/axios'
import {
  NewConstraint,
  Schema,
  SchemaMention,
  SchemaRelation,
  SchemaWrapper,
} from '@/types/schema'
import { Team } from '@/types/user'
import { ModelStepType } from '../types/model'
import { DocumentEdit } from '@/types/document'
import { ModelWithSetting } from '@/features/projects/types/models'

export const getSchema = async (id: number): Promise<Schema> => {
  const response = await axiosInstance.get<Schema>(`/schemas/${id}`)
  return response.data
}

export const getSchemas = async (): Promise<Schema[]> => {
  const response = await axiosInstance.get<SchemaWrapper>(`schemas`)
  console.log(response.data.schemas)
  return response.data.schemas
}

export const createSchema = async (
  team: Team,
  name: string,
  mentions: Omit<SchemaMention, 'id'>[],
  relations: Omit<SchemaRelation, 'id'>[],
  constraints: NewConstraint[]
): Promise<Schema> => {
  const response = await axiosInstance.post<Schema>(
    `/schemas?team_id=${team.id}`,
    {
      name: name,
      modelling_language: 'BPMN',
      schema_mentions: mentions,
      schema_relations: relations,
      schema_constraints: constraints,
    }
  )
  return response.data
}

export const getTrainSettings = async (
  schema: Schema,
  modelStepType: ModelStepType
): Promise<Omit<ModelWithSetting, 'id' | 'name'>[]> => {
  const response = await axiosInstance.get<any>(`/schemas/${schema.id}/train`)

  switch (modelStepType) {
    case ModelStepType.entities:
      return response.data.entity as Omit<ModelWithSetting, 'id' | 'name'>[]
    case ModelStepType.relations:
      return response.data.relation as Omit<ModelWithSetting, 'id' | 'name'>[]
    case ModelStepType.mentions:
      return response.data.mention as Omit<ModelWithSetting, 'id' | 'name'>[]
  }
}

export const getDocumentEditsBySchema = async (
  schema: Schema
): Promise<DocumentEdit[]> => {
  const response = await axiosInstance.get<any>(
    `document_edits/schema/${schema.id}`
  )
  console.log()
  return response.data
}
