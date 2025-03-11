import axiosInstance from '@/lib/axios';
import { Project } from '@/types/project.ts';
import { Document } from '@/types/document.ts';

export const getProjects = async (): Promise<Project[]> => {
  const response = await axiosInstance.get('/projects');
  return response.data.projects;
};

export const getDocumentsByProject = async (
  projectId: number
): Promise<Document[]> => {
  const response = await axiosInstance.get(`/documents/project/${projectId}`);
  return response.data;
};
