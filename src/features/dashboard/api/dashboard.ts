import axiosInstance from "@/lib/axios"

export const getProjects = async () => {
  const response = await axiosInstance.get("/projects")
  return response.data.projects
}

export const getDocumentsByProject = async (projectId: number) => {
  const response = await axiosInstance.get(`/documents/project/${projectId}`)
  return response.data
}
export const deleteProject = async (project_Id: number) => {
  await axiosInstance.delete(`/projects/${project_Id}`)
}
export const deleteDocument = async (documentId: number) => {
  await axiosInstance.delete(`/documents/${documentId}`)
}
export const createDocument = async (
  projectId: number,
  fileName: string,
  fileContent: string
) => {
  const response = await axiosInstance.post(
    `/documents`,
    {
      project_id: projectId,
      file_name: fileName,
      file_content: fileContent
    }
  )
  return response.data
}