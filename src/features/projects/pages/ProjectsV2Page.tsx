import Page from '@/components/Page'
import PageHeader from '@/components/PageHeader'
import { useEffect, useState } from 'react'
import { createProject, getProjects, getSchemas, getTeams } from '../api/projects'
import { Project } from '@/types/project'
import ProjectV2Card from '../components/ProjectV2Card'
import { Team } from '@/types/user'
import { Schema } from '@/types/schema'
import { CreateProjectDialog } from '../components/CreateProjectDialog'

const ProjectV2Page: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [schemas, setSchemas] = useState<Schema[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const projectsData = await getProjects()
      const teamsData = await getTeams()
      const schemasData = await getSchemas()
      setProjects(projectsData)
      setTeams(teamsData)
      setSchemas(schemasData)
    }
    fetchUsers()
  }, [])

  const handleCreateProject = async (name: string, teamId: number, schemaId: number) => {
    const newProject = await createProject(name, teamId, schemaId)
    setProjects([...projects, newProject])
  }

  return (
    <Page>
      <PageHeader title="Projects" />
      <div className="flex flex-row-reverse">
       <CreateProjectDialog teams={teams} schemas={schemas} handleCreateProject={handleCreateProject} />
      </div>
      <div className="flex flex-wrap">
        {projects.map((p) => (
          <ProjectV2Card key={p.id} project={p} />
        ))}
      </div>
    </Page>
  )
}

export default ProjectV2Page
