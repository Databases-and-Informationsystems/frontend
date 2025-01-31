import axiosInstance from "@/lib/axios"

export const getProjects = async () => {
  const response = await axiosInstance.get("/projects")
  return response.data.projects
}

export const getDocumentsByProject = async (projectId: number) => {
  const response = await axiosInstance.get(`/documents/project/${projectId}`)
  return response.data
}