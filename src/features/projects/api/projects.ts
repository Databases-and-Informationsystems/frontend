import axiosInstance from '@/lib/axios'

export const getProjects = async () => {
  const response = await axiosInstance.get('/projects/')
  return response.data
}

export const createProject = async (
  name: string,
  teamId: number,
  schemaId: number
) => {
  const response = await axiosInstance.post('/projects/', {
    name,
    team_id: teamId,
    schema_id: schemaId,
  })
  return response.data
}

export const getDocumentsByProject = async (projectId: number) => {
  const response = await axiosInstance.get(`/projects/${projectId}/documents`)
  return response.data
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

export const getTeams = async () => {
  const response = await axiosInstance.get('/teams/')
  return response.data
}

export const getSchemas = async () => {
  const response = await axiosInstance.get('/schemas/')
  return response.data
}
