import axiosInstance from '@/lib/axios'
import { Document, DocumentWrapper } from '@/types/document'
import { Project, ProjectWrapper } from '@/types/project'
import { Schema, SchemaWrapper } from '@/types/schema'
import { Team, TeamsWrapper } from '@/types/user'

export const getProjects = async (): Promise<Project[]> => {
  const response = await axiosInstance.get<ProjectWrapper>('/projects')
  return response.data.projects
}

/**
 * dump projects/:id endpoint for testing
 */
export const getProjectById = async (id: number): Promise<Project> => {
  const response = await axiosInstance.get<ProjectWrapper>(`/projects`)
  const project = response.data.projects.find((p) => p.id === id)
  if (!project) {
    return Promise.reject()
  }
  return project
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

export const getDocumentsByProject = async (
  projectId: number
): Promise<Document[]> => {
  const response = await axiosInstance.get<DocumentWrapper>(
    `/documents/project/${projectId}`
  )
  return response.data.documents
}

export const createDocument = async (
  projectId: number,
  fileName: string,
  fileContent: string
): Promise<Document> => {
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

export const getSchemas = async (): Promise<Schema[]> => {
  const response = await axiosInstance.get<SchemaWrapper>('/schemas')
  return response.data.schemas
}
