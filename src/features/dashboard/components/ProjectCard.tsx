import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { STATUS_STYLES } from '@/types/document'
import { Project } from '@/types/project'
import StartAnnotatingModal from '@/features/projects/components/StartAnnotationModal'

interface ProjectCardProps {
  project: Project
  onAddDocument: () => void
  onDeleteDocument: (id: number) => void
  onOpenProject: (project: Project) => void
  onDeleteProject:(projectId: number) => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onAddDocument,
  onDeleteDocument,
  onOpenProject,
  onDeleteProject
}: ProjectCardProps) => {
  const [showOngoing, setShowOngoing] = useState<boolean>(false)
  const [showOpen, setShowOpen] = useState<boolean>(false)
  const [showCompleted, setShowCompleted] = useState<boolean>(false)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [isStartAnnotationModalOpen, setIsAnnotationModalOpen] = useState<boolean>(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);



  const handleContinueWorking = (docId: number) => {
    navigate(`/annotation/${docId}`);
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
      {!isOpen && (
        <>
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
                {project.documents?.filter((d) => d.state.type === 'NEW').length})
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
                      <button
                        onClick={() => {
                        setIsAnnotationModalOpen(true);
                        setSelectedDocument(doc);
                      }}
                      className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                       >
                      Start Working
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
          {selectedDocument && (
                 <StartAnnotatingModal
                  isOpen={isStartAnnotationModalOpen}
                  setIsModalOpen={setIsAnnotationModalOpen}
                  document = {selectedDocument}
              />
            )}
          <div className="mt-4">
            <button
              className="w-full flex items-center justify-between bg-gray-100 py-2 px-4 rounded-lg text-left hover:bg-gray-200"
              onClick={() => setShowCompleted(!showCompleted)}
            >
              <span className={`font-semibold ${STATUS_STYLES.FINISHED}`}>
                Completed (
                {project.documents?.filter((d) => d.state.type === 'FINISHED').length})
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
              onClick={() => {
                setIsOpen(true);
                onOpenProject(project);
              }}              
            >
              Open Project
            </button>
            <button
              className="mt-4 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
              onClick={() => onDeleteProject(project.id)}
            >
             delete Project
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
                  {project.documents?.filter((d) => d.state.type === 'NEW').length})
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
                    .map((doc) => (
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
                            to={`/dashboard/schemas/${doc.schema.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {doc.schema.name}
                          </Link>
                        </p>
                        <button
            onClick={() => {
              setIsAnnotationModalOpen(true);
              setSelectedDocument(doc);
            }}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Start Working
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
            {selectedDocument && (
                 <StartAnnotatingModal
                  isOpen={isStartAnnotationModalOpen}
                  setIsModalOpen={setIsAnnotationModalOpen}
                  document = {selectedDocument}
              />
            )}
            <div className="mt-4">
              <button
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                onClick={() => {
                  onAddDocument();
                  setSelectedDocument(document);
                }}                
              >
                Add Document
              </button>
            </div>

            <div className="mt-4">
              <button
                className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  )
}

export default ProjectCard
