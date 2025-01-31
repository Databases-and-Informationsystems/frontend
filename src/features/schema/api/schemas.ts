import axiosInstance from '@/lib/axios'
import {
  NewConstraint,
  Schema,
  SchemaMention,
  SchemaRelation,
  SchemaWrapper
} from '@/types/schema'
import { Team } from '@/types/user'

export const getSchema = async (id: number): Promise<Schema> => {
  const response = await axiosInstance.get<Schema>(`/schemas/${id}`)
  return response.data
}

export const getSchemas = async () : Promise<Schema[]> => {
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
