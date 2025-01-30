import { Project } from '@/types/project'

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import StyledLink from '@/components/StyledLink'

export interface ProjectV2CardProps {
  project: Project
}

const ProjectV2Card: React.FC<ProjectV2CardProps> = ({ project }) => {
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>
          <StyledLink to={`/dashboard/projects-v2/${project.id}`}>
            {project.name}
          </StyledLink>
          <Button
            variant="link"
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            Delete
          </Button>
        </CardTitle>
        <CardDescription>
          Created by <strong>{project.creator.username}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          Schema:{' '}
          <StyledLink to={`/dashboard/schemas/${project.schema.id}`}>
            {project.schema.name}
          </StyledLink>
        </p>
        <p className="text-sm text-gray-600">Team: {project.team.name}</p>
        <div className="flex flex-row-reverse">
          <Button>
            <Link to={`/dashboard/projects-v2/${project.id}`}>Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectV2Card
