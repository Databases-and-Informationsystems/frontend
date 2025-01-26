import axiosInstance from '@/lib/axios'
import { Team, TeamsWrapper, Schema, SchemaWrapper, Document, DocumentWrapper, Project, ProjectWrapper } from '../types/types'

export const getProjects = async () : Promise<Project[]> => {
  const response = await axiosInstance.get<ProjectWrapper>('/projects')
  return response.data.projects
}

export const createProject = async (
  name: string,
  teamId: number,
  schemaId: number
) => {
  const response = await axiosInstance.post('/projects', {
    name,
    team_id: teamId,
    schema_id: schemaId,
  })
  return response.data
}

export const getDocumentsByProject = async (projectId: number): Promise<Document[]> => {
  const response = await axiosInstance.get<DocumentWrapper>(`/projects/${projectId}/documents`)
  return response.data.documents
}

export const createDocument = async (
  projectId: number,
  fileName: string,
  fileContent: string
) => {
  const response = await axiosInstance.post(
    `/projects/${projectId}/documents`,
    { name: fileName, content: fileContent }
  )
  return response.data
}

export const deleteDocument = async (documentId: number) => {
  await axiosInstance.delete(`/documents/${documentId}`)
}

export const getTeams = async (): Promise<Team[]> => {
  const response = await axiosInstance.get<TeamsWrapper>('/teams')
  return response.data.teams
}

export const getSchemas = async () : Promise<Schema[]> => {
  const response = await axiosInstance.get<SchemaWrapper>('/schemas')
  return response.data.schemas
}
