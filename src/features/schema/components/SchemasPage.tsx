import { useState } from 'react'
import { Link } from 'react-router'
//import { HexColorPicker } from "react-colorful";

interface Mention {
  name: string
  color: string
}

interface Relation {
  name: string
}

interface Dependency {
  fromMention: string
  relation: string
  toMention: string
}

interface Schema {
  name: string
  mentions: Mention[]
  relations: Relation[]
  dependencies: Dependency[]
}

const mockSchemas = [
  { id: 1, name: 'Pet Schema', mentions: 6, relations: 7, locked: true },
  { id: 2, name: 'Test Schema', mentions: 6, relations: 7, locked: false },
]

const SchemasPage = () => {
  const [schemas, setSchemas] = useState(mockSchemas)
  const [isModalOpen, setModalOpen] = useState(false)
  const [newSchema, setNewSchema] = useState<Schema>({
    name: '',
    mentions: [],
    relations: [],
    dependencies: [],
  })
  const [mentionColor] = useState('#aabbcc')
  const [mentionName, setMentionName] = useState('')
  const [relationName, setRelationName] = useState('')
  const [fromMention, setFromMention] = useState('')
  const [toMention, setToMention] = useState('')
  const [selectedRelation, setSelectedRelation] = useState('')
  const addMention = () => {
    if (mentionName) {
      setNewSchema((prev) => ({
        ...prev,
        mentions: [
          ...prev.mentions,
          { name: mentionName, color: mentionColor },
        ],
      }))
      setMentionName('')
    }
  }
  const addDependency = () => {
    if (fromMention && toMention && selectedRelation) {
      setNewSchema((prev) => ({
        ...prev,
        dependencies: [
          ...prev.dependencies,
          {
            fromMention,
            relation: selectedRelation,
            toMention,
          },
        ],
      }))
      setFromMention('')
      setToMention('')
      setSelectedRelation('')
    }
  }

  const addRelation = () => {
    if (relationName) {
      setNewSchema((prev) => ({
        ...prev,
        relations: [...prev.relations, { name: relationName }],
      }))
      setRelationName('')
    }
  }

  const saveSchema = () => {
    if (newSchema.name) {
      setSchemas((prev) => [
        ...prev,
        {
          id: schemas.length + 1,
          name: newSchema.name,
          mentions: newSchema.mentions.length,
          relations: newSchema.relations.length,
          locked: false,
        },
      ])
      setNewSchema({ name: '', mentions: [], relations: [], dependencies: [] })
      setModalOpen(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Link
        to={`/dashboard/schemas/create`}
        className="fixed top-6 right-6 bg-[#0097E1] text-white py-2 px-4 rounded-lg hover:bg-[#4ab9f0] dark:bg-[#007bb8] dark:hover:bg-[#009adf]"
      >
        Create Schema
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Schemas
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
        {schemas.map((schema) => (
          <div
            key={schema.id}
            className={`p-4 border rounded ${
              schema.locked
                ? 'bg-gray-200 dark:bg-gray-800'
                : 'bg-white dark:bg-gray-900'
            } border-gray-300 dark:border-gray-700`}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {schema.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Mentions: {schema.mentions}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Relations: {schema.relations}
            </p>

            <Link
              to={`/dashboard/schemas/${schema.id}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              <button
                className={`mt-2 px-4 py-2 rounded text-white ${
                  schema.locked
                    ? 'bg-gray-400 dark:bg-gray-600'
                    : 'bg-blue-500 dark:bg-blue-700'
                }`}
              >
                {schema.locked ? 'View' : 'Edit'}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SchemasPage
