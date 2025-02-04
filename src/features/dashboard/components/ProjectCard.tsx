import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router'
import { STATUS_STYLES } from '@/types/document'
import { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
}: ProjectCardProps) => {
  const [showOngoing, setShowOngoing] = useState<boolean>(false)
  const [showOpen, setShowOpen] = useState<boolean>(false)
  const [showCompleted, setShowCompleted] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleOpenProject = () => {
    // This does not make sense, as navigation is to page of projects
    navigate('/dashboard/projects')
  }
  const handleContinueWorking = (docId: number) => {
    navigate(`/annotation/${docId}`);
  };

  const handleStartWorking = (docId: number) => {
    navigate(`/annotation/start/${docId}`);
  };
  return (
    <div className="project-card bg-white p-8 rounded-lg shadow-lg w-full">
      <h3 className="text-2xl font-bold">{project.name}</h3>
      <p className="text-sm text-gray-600">
        Schema:{' '}
        <Link
          to={`/dashboard/schemas/${project.schema.id}`}
          className="text-blue-600 hover:underline"
        >
          {project.schema.name}
        </Link>
      </p>
      <p className="text-sm text-gray-600">Team: {project.team?.name}</p>
      <p className="text-sm text-gray-800 font-medium">
        Total Documents: {project.documents?.length}
      </p>
      <div className="mt-4">
        <button
          className="w-full flex items-center justify-between bg-gray-100 py-2 px-4 rounded-lg text-left hover:bg-gray-200"
          onClick={() => setShowOngoing(!showOngoing)}
        >
          <span className={`font-semibold ${STATUS_STYLES.IN_PROGRESS}`}>
            Ongoing (
            {project.documents?.filter((d) => d.state.type === 'IN_PROGRESS').length})
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`transition-transform duration-200 ${showOngoing ? 'rotate-180' : ''}`}
          />
        </button>
        {showOngoing && (
          <div className="mt-2">
            {project.documents
              ?.filter((d) => d.state.type === 'IN_PROGRESS')
              .map((doc, index) => (
                <div
                  key={index}
                  className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm w-full mb-4"
                >
                  <p className="font-semibold">{doc.name}</p>
                  <p className="text-sm text-gray-600">
                    Project: {doc.project.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Schema:{' '}
                    <Link
                      to={`/dashboard/schemas/${doc.schema.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {doc.schema.name}
                    </Link>
                  </p>
                  <button onClick={() => handleContinueWorking(doc.id)} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Continue Working
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="mt-4">
        <button
          className="w-full flex items-center justify-between bg-gray-100 py-2 px-4 rounded-lg text-left hover:bg-gray-200"
          onClick={() => setShowOpen(!showOpen)}
        >
          <span className={`font-semibold ${STATUS_STYLES.NEW}`}>
            Open (
            {
              project.documents?.filter((d) => d.state.type === 'NEW')
                .length
            }
            )
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`transition-transform duration-200 ${showOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {showOpen && (
          <div className="mt-2">
            {project.documents
              ?.filter((d) => d.state.type === 'NEW')
              .map((doc, index) => (
                <div
                  key={index}
                  className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm w-full mb-4"
                >
                  <p className="font-semibold">{doc.name}</p>
                  <p className="text-sm text-gray-600">
                    Project: {doc.project.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Schema:{' '}
                    <Link
                      to={`/dashboard/schemas/${doc.schema.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {doc.schema.name}
                    </Link>
                  </p>
                  <button onClick={() => handleStartWorking(doc.id)}className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                    Start Working
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="mt-4">
        <button
          className="w-full flex items-center justify-between bg-gray-100 py-2 px-4 rounded-lg text-left hover:bg-gray-200"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          <span className={`font-semibold ${STATUS_STYLES.FINISHED}`}>
            Completed (
            {
              project.documents?.filter((d) => d.state.type === 'FINISHED')
                .length
            }
            )
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`transition-transform duration-200 ${showCompleted ? 'rotate-180' : ''}`}
          />
        </button>
        {showCompleted && (
          <div className="mt-2">
            {project.documents
              ?.filter((d) => d.state.type === 'FINISHED')
              .map((doc, index) => (
                <div
                  key={index}
                  className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm w-full mb-4"
                >
                  <p className="font-semibold">{doc.name}</p>
                  <p className="text-sm text-gray-600">
                    Project: {doc.project.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Schema:{' '}
                    <Link
                      to={`/dashboard/schemas/${doc.schema.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {doc.schema.name}
                    </Link>
                  </p>
                  <button className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700">
                    Open Document
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="mt-4">
        <button
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          onClick={handleOpenProject}
        >
          Open Project
        </button>
      </div>
    </div>
  )
}

export default ProjectCard
