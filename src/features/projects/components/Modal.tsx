import React from 'react'
import { Schema, Team } from '../types/types'
import { Link } from 'react-router'

interface ModalPropsCreate {
  isOpen: boolean
  onClose: () => void
  onCreate: (name: string, schema: Schema, team: Team) => void
  projectName: string
  setProjectName: React.Dispatch<React.SetStateAction<string>>
  team: Team | undefined
  setTeam: React.Dispatch<React.SetStateAction<Team | undefined>>
  schema: Schema | undefined
  setSchema: React.Dispatch<React.SetStateAction<Schema | undefined>>
  teams: Team[]
  schemas: Schema[]
}

interface ModalPropsDetails {
  isOpen: boolean
  onClose: () => void
  title: string
  schema: Schema | undefined
  team: Team | undefined
  documents: {
    ongoing: { name: string; project: string; schema: string }[]
    open: { name: string; project: string; schema: string }[]
    completed: { name: string; project: string; schema: string }[]
  }
}

type ModalProps = ModalPropsCreate | ModalPropsDetails

const Modal: React.FC<ModalProps> = (props) => {
  if (!props.isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out opacity-100"
      role="dialog"
      aria-labelledby="modal-title"
      aria-hidden={!props.isOpen}
    >
      <div
        className="bg-white p-6 rounded-lg w-96 transition-all transform scale-95 ease-in-out duration-300 opacity-100"
        role="document"
      >
        {'title' in props && (
          <h2 className="text-xl font-bold mb-4" id="modal-title">
            {props.title}
          </h2>
        )}

        {'onCreate' in props && (
          <>
            <div className="mb-4">
              <label
                htmlFor="project-name"
                className="block text-sm font-semibold"
              >
                Project Name
              </label>
              <input
                id="project-name"
                type="text"
                value={props.projectName}
                onChange={(e) => props.setProjectName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter project name"
                aria-label="Enter project name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="team" className="block text-sm font-semibold">
                Team
              </label>
              <select
                id="team"
                value={props.team?.id}
                onChange={(e) =>
                  props.setTeam(
                    props.teams.find((t) => t.id === Number(e.target.value))
                  )
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                aria-label="Select team"
              >
                <option value="">Select Team</option>
                {props.teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="schema" className="block text-sm font-semibold">
                Schema
              </label>
              <select
                id="schema"
                value={props.schema?.id}
                onChange={(e) =>
                  props.setSchema(
                    props.schemas.find((s) => s.id === Number(e.target.value))
                  )
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                aria-label="Select schema"
              >
                <option value="">Select Schema</option>
                {props.schemas.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                disabled={!props.schema || !props.team}
                onClick={() => {
                  if (props.schema && props.team) {
                    props.onCreate(
                      props.projectName,
                      props.schema!,
                      props.team!
                    )
                  }
                }}
                aria-label="Create project"
              >
                Create
              </button>
            </div>
          </>
        )}

        {'documents' in props && (
          <>
            <p className="text-sm text-black">
              Schema:{' '}
              <Link
                to={`/dashboard/schemas/${props.schema?.id}`}
                className="text-blue-600 hover:underline"
              >
                {props.schema?.name}
              </Link>
            </p>
            <p className="text-sm text-black">Team: {props.team?.name}</p>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Ongoing Projects</h3>
              <ul className="space-y-2">
                {props.documents.ongoing.map((doc, index) => (
                  <li key={index} className="text-sm">
                    {doc.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Open Projects</h3>
              <ul className="space-y-2">
                {props.documents.open.map((doc, index) => (
                  <li key={index} className="text-sm">
                    {doc.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Completed Projects</h3>
              <ul className="space-y-2">
                {props.documents.completed.map((doc, index) => (
                  <li key={index} className="text-sm">
                    {doc.name}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            onClick={props.onClose}
            aria-label="Close modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
