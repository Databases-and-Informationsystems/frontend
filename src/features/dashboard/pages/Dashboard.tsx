import React, { useState, useEffect } from 'react'
import ProjectCard from '../components/ProjectCard'
import StatusFilter from '../components/StatusFilter'
import DocumentForm from '@/features/projects/components/DocumentForm'
import { getProjects, getDocumentsByProject ,deleteDocument,createDocument,
  deleteProject} from '../api/dashboard'
import { Document } from '@/types/document'
import { Project } from '@/types/project'

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null) 
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [isAddDocOpen, setIsAddDocOpen] = useState(false)
  const handleOpenProject = async (project: Project) => {
      setSelectedProject(project);
      setIsDetailsVisible(true); 
    };
  const handleAddDocument = async (name: string, content: string) => {
      if (!selectedProjectId) return;
      try {
  
        const newDoc = await createDocument(selectedProjectId, name, content)
        setProjects((prev) => {
          return prev.map((p) =>
            p.id === selectedProjectId
              ? { ...p, documents: [...(p.documents || []), newDoc] } 
              : p
          )
        })
      } catch (error) {
        console.error('Error adding document:', error)
      }
    }
  
  const handleDeleteDocument = async (id: number, projectId: number) => {
     try {
       await deleteDocument(id)
       setProjects((prev) =>
         prev.map((project) =>
           project.id === projectId
             ? {
                 ...project,
                 documents: project.documents?.filter((doc) => doc.id !== id),
               }
             : project
         )
       )
     } catch (error) {
       console.error('Error deleting document:', error)
     }
  }
  useEffect(() => {
    const fetchProjectsAndDocuments = async () => {
      try {
        const projectsData = await getProjects()
        console.log('Projects retrieved : ', projectsData)

        const projectsWithDocuments: Project[] = await Promise.all(
          projectsData.map(async (project: Project) => {
            const documents = await getDocumentsByProject(project.id)
            console.log('Documents retrieved for the project ', documents)
            return {
              ...project,
              documents: documents.documents,
            }
          })
        )
        setProjects(projectsWithDocuments)
        setDocuments(projectsWithDocuments.flatMap((p) => p.documents ?? []))
      } catch (error) {
        console.error('Data not found', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjectsAndDocuments()
  }, [])

  if (loading) {
    return <div> Loading project ...</div>
  }
  const handleDeleteProject = async (projectId: number) => {
      try {
        await deleteProject(projectId);
        setProjects((prev) => prev.filter((project) => project.id !== projectId));
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    };
  return (
    <div className="container mx-auto p-6 space-y-6">
      <StatusFilter documents={documents} />
      <h1 className="text-2xl font-bold mt-6 mb-4">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard 
          key={project.id} 
          project={project}
          onDeleteProject={handleDeleteProject}
          onDeleteDocument={(id) => handleDeleteDocument(id, project.id)}
          onAddDocument={() => {setSelectedProjectId(project.id); setIsAddDocOpen(true)}} 
          onOpenProject={handleOpenProject}
          />
        ))}
      </div>
      {isAddDocOpen && (
        <div className="relative z-50">
          <DocumentForm
            onClose={() => setIsAddDocOpen(false)}
            onCreate={handleAddDocument} 
          />
        </div>
      )}

    </div>
  )
}

export default Dashboard
