import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Project } from '../types/types'
import { Link } from 'react-router'

interface ProjectCardProps {
  project: Project
  onAddDocument: () => void
  onOpenProject: () => void
  onCloseProject?: () => void
  onPreview: (content: string) => void
  onDeleteDocument: (id: number) => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onAddDocument,
  onPreview,
  onDeleteDocument,
}: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showOngoing, setShowOngoing] = useState(false)
  const [showOpen, setShowOpen] = useState(false)
  const [showCompleted, setShowCompleted] = useState(false)
  const title = project.name
  const schema = project.schema
  const team = project.team
  const documents = project.documents ?? []
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">Schema: {schema.name}</p>
      <p className="text-sm text-gray-600">Team: {team.name}</p>
      {!isOpen && (
        <>
          <div className="mt-4">
            <button
              className="w-full flex items-center justify-between bg-gray-100 py-2 px-4 rounded-lg text-left hover:bg-gray-200"
              onClick={() => setShowOngoing(!showOngoing)}
            >
              <span className="font-semibold text-green-600">
                Ongoing ({documents.length})
              </span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-200 ${
                  showOngoing ? 'rotate-180' : ''
                }`}
              />
            </button>
            {showOngoing && (
              <div className="mt-2">
                {documents.map((doc, index) => (
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
                        to={`/dashboard/schemas/${project.schema.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {project.schema.name}
                      </Link>
                    </p>
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
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
              <span className="font-semibold text-blue-600">
                Open ({documents.length})
              </span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-200 ${
                  showOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {showOpen && (
              <div className="mt-2">
                {documents.map((doc, index) => (
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
                        to={`/dashboard/schemas/${project.schema.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {project.schema.name}
                      </Link>
                    </p>
                    <button className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
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
              <span className="font-semibold text-gray-600">
                Completed ({documents.length})
              </span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-200 ${
                  showCompleted ? 'rotate-180' : ''
                }`}
              />
            </button>
            {showCompleted && (
              <div className="mt-2">
                {documents.map((doc, index) => (
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
                        to={`/dashboard/schemas/${project.schema.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {project.schema.name}
                      </Link>
                    </p>
                    <button className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700">
                      View Document
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4">
            <button
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
              onClick={() => setIsOpen(true)}
            >
              Open Project
            </button>
          </div>
        </>
      )}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-xl font-semibold mb-4">Project Details</h4>
            <div className="mt-4">
              <button
                className="w-full flex items-center justify-between bg-gray-100 py-2 px-4 rounded-lg text-left hover:bg-gray-200"
                onClick={() => setShowOngoing(!showOngoing)}
              >
                <span className="font-semibold text-green-600">
                  Ongoing ({documents.length})
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`transition-transform duration-200 ${
                    showOngoing ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {showOngoing && (
                <div className="mt-2">
                  {documents.map((doc, index) => (
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
                          to={`/dashboard/schemas/${project.schema.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {project.schema.name}
                        </Link>
                      </p>
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-4 relative">
                          <div
                            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                            style={{ width: `${doc.progress}%` }}
                          ></div>
                        </div>
                        <p className="mt-2 text-sm text-center font-medium text-gray-600">
                          {doc.progress === 0
                            ? 'Not started'
                            : doc.progress < 100
                              ? 'In Progress'
                              : 'Completed'}
                        </p>
                      </div>
                      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
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
                <span className="font-semibold text-blue-600">
                  Open ({documents.length})
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`transition-transform duration-200 ${
                    showOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {showOpen && (
                <div className="mt-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm w-full mb-4"
                    >
                      <p className="font-semibold">{doc.name}</p>
                      <p className="text-sm text-gray-600">
                        Project: {doc.project.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Schema:{' '}
                        <Link
                          to={`/dashboard/schemas/${project.schema.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {project.schema.name}
                        </Link>
                      </p>
                      <button className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                        Start Working
                      </button>
                      <button
                        className="mt-2 w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700"
                        onClick={() => onPreview(doc.name)}
                      >
                        Preview
                      </button>
                      <button
                        className="mt-2 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                        onClick={() => onDeleteDocument(doc.id)}
                      >
                        Delete
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
                <span className="font-semibold text-gray-600">
                  Completed ({documents.length})
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`transition-transform duration-200 ${
                    showCompleted ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {showCompleted && (
                <div className="mt-2">
                  {documents.map((doc, index) => (
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
                          to={`/dashboard/schemas/${project.schema.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {project.schema.name}
                        </Link>
                      </p>
                      <button className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700">
                        View Document
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-between">
              <button
                className="w-1/3 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                onClick={onAddDocument}
              >
                Add Document
              </button>
            </div>

            <div className="mt-4">
              <button
                className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                onClick={() => setIsOpen(false)}
              >
                Close project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectCard
