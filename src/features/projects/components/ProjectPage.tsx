import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import DocumentForm from './DocumentForm'
import ProjectCard from '@/features/dashboard/components/ProjectCard'

import {
  getProjects,
  createProject,
  getDocumentsByProject,
  createDocument,
  deleteDocument,
  getTeams,
  getSchemas,
  deleteProject
} from '../api/projects'
import { Document } from '@/types/document'
import { Schema } from '@/types/schema'
import { Team } from '@/types/user'
import { Project } from '@/types/project'

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [isAddDocOpen, setIsAddDocOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [schema, setSchema] = useState<Schema | undefined>(undefined)
  const [team, setTeam] = useState<Team | undefined>(undefined)
  const [teams, setTeams] = useState<Team[]>([])
  const [schemas, setSchemas] = useState<Schema[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null) 
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);


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
  const handleDeleteProject = async (projectId: number) => {
    try {
      await deleteProject(projectId);
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };
  
  const handleOpenProject = async (project: Project) => {
    setSelectedProject(project);
    setIsDetailsVisible(true); 
  };
  

  useEffect(() => {
    const fetchProjectsAndDocuments = async () => {
      try {
        const projectsData = await getProjects()
        console.log('Projects retrieved : ', projectsData)

        const projectsWithDocuments: Project[] = await Promise.all(
          projectsData.map(async (project: Project) => {
            const documents = await getDocumentsByProject(project.id)
            console.log('Documents retrieved for project ', project.id, documents)
            return {
              ...project,
              documents: documents || [], 
            }
          })
        )

        setProjects(projectsWithDocuments)
        setDocuments(projectsWithDocuments.flatMap((p) => p.documents ?? []))
      } catch (error) {
        console.error('Error fetching projects and documents:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjectsAndDocuments()
  }, [])

  useEffect(() => {
    const fetchTeamsAndSchemas = async () => {
      try {
        const [teamsData, schemasData] = await Promise.all([getTeams(), getSchemas()])
        setTeams(teamsData)
        setSchemas(schemasData)
      } catch (error) {
        console.error('Error fetching teams and schemas:', error)
      }
    }

    fetchTeamsAndSchemas()
  }, [])

  const handleCreateProject = async (name: string, schema: Schema, team: Team) => {
    try {
      const newProject = await createProject(name, team.id, schema.id)
      setProjects((prev) => [...prev, newProject])
      setIsProjectModalOpen(false)
      setSelectedProject(newProject)
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  if (loading) {
    return <div>Loading projects...</div>
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <button
        className="fixed top-6 right-6 bg-[#0097E1] text-white py-2 px-4 rounded-lg hover:bg-[#4ab9f0]"
        onClick={() => setIsProjectModalOpen(true)}
      >
        Create Project
      </button>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
          key={project.id}
          project={project}
          onAddDocument={() => {setSelectedProjectId(project.id); setIsAddDocOpen(true)}}
          onDeleteDocument={(id) => handleDeleteDocument(id, project.id)}
          onOpenProject={handleOpenProject}
          onDeleteProject={handleDeleteProject}
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

      {isProjectModalOpen && (
        <Modal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          onCreate={handleCreateProject}
          projectName={projectName}
          setProjectName={setProjectName}
          schema={schema}
          setSchema={setSchema}
          team={team}
          setTeam={setTeam}
          teams={teams}
          schemas={schemas}
        />
      )}
    </div>
  )
}

export default ProjectPage
