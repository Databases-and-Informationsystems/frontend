import Page from '@/components/Page'
import PageHeader from '@/components/PageHeader'
import { useEffect, useState } from 'react'
import { getProjects } from '../api/projects'
import { Project } from '@/types/project'
import ProjectV2Card from '../components/ProjectV2Card'
import { Button } from '@/components/ui/button'

const ProjectV2Page: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  useEffect(() => {
    const fetchUsers = async () => {
      const projectsData = await getProjects()
      setProjects(projectsData)
    }
    fetchUsers()
  }, [])
  return (
    <Page>
      <PageHeader title="Projects" />
      <div className="flex flex-row-reverse">
        <Button>Create Project</Button>
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
