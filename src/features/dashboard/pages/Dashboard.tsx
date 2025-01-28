import React, { useState, useEffect } from 'react'
import ProjectCard from '../components/ProjectCard'
import StatusFilter from '../components/StatusFilter'
import { getProjects, getDocumentsByProject } from '../api/dashboard'
import { Document } from '@/types/document'
import { Project } from '@/types/project'

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState<boolean>(true)

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

            return {
              ...project,
              documents: {
                ongoing: documents.filter(
                  (doc: any) => doc.document_edit_state === 'ongoing'
                ),
                open: documents.filter(
                  (doc: any) => doc.document_edit_state === 'open'
                ),
                completed: documents.filter(
                  (doc: any) => doc.document_edit_state === 'completed'
                ),
              },
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

  return (
    <div className="container mx-auto p-6 space-y-6">
      <StatusFilter documents={documents} />
      <h1 className="text-2xl font-bold mt-6 mb-4">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
