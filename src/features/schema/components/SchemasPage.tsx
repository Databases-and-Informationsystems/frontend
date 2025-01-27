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
        className="fixed top-6 right-6 bg-[#0097E1] text-white py-2 px-4 rounded-lg hover:bg-[#4ab9f0]"
      >
        Create Schema
      </Link>
      <h1 className="text-2xl font-bold">Schemas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4 ">
        {schemas.map((schema) => (
          <div
            key={schema.id}
            className={`p-4 border rounded ${
              schema.locked ? 'bg-gray-200' : 'bg-white'
            }`}
          >
            <h2 className="text-xl font-semibold">{schema.name}</h2>
            <p>Mentions: {schema.mentions}</p>
            <p>Relations: {schema.relations}</p>

            <Link
              to={`/dashboard/schemas/${schema.id}`}
              className="text-blue-600 hover:underline"
            >
              <button
                className={`mt-2 px-4 py-2 rounded ${
                  schema.locked ? 'bg-gray-400' : 'bg-blue-500'
                } text-white`}
              >
                {schema.locked ? 'View' : 'Edit'}
              </button>
            </Link>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-11/12 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold">Create a New Schema</h2>
            <p className="text-gray-600">
              Your schema can’t be changed when it’s used in a project.
            </p>
            <label className="block mt-4">
              Schema Name
              <input
                type="text"
                value={newSchema.name}
                onChange={(e) =>
                  setNewSchema((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full border p-2 mt-1 rounded"
              />
            </label>

            <div className="mt-4">
              <h3 className="font-semibold">Mentions</h3>
              <div className="flex items-center mt-2">
                <input
                  type="text"
                  value={mentionName}
                  onChange={(e) => setMentionName(e.target.value)}
                  placeholder="Mention name"
                  className="border p-2 flex-1 rounded"
                />

                <button
                  onClick={addMention}
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Create
                </button>
              </div>
              <div className="flex mt-2 space-x-2">
                {newSchema.mentions.map((mention, index) => (
                  <span
                    key={index}
                    className="flex items-center space-x-2 bg-gray-200 px-2 py-1 rounded"
                  >
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: mention.color }}
                    ></span>
                    <span>{mention.name}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Relations</h3>
              <div className="flex items-center mt-2">
                <input
                  type="text"
                  value={relationName}
                  onChange={(e) => setRelationName(e.target.value)}
                  placeholder="Relation name"
                  className="border p-2 flex-1 rounded"
                />
                <button
                  onClick={addRelation}
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Create
                </button>
              </div>
              <div className="mt-2">
                {newSchema.relations.map((relation, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-2 py-1 rounded inline-block mr-2"
                  >
                    {relation.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Dependencies</h3>
              <div className="flex items-center mt-2 space-x-2">
                <select
                  value={fromMention}
                  onChange={(e) => setFromMention(e.target.value)}
                  className="border p-2 rounded flex-1"
                >
                  <option value="">Select mention</option>
                  {newSchema.mentions.map((mention, index) => (
                    <option key={index} value={mention.name}>
                      {mention.name}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedRelation}
                  onChange={(e) => setSelectedRelation(e.target.value)}
                  className="border p-2 rounded flex-1"
                >
                  <option value="">Select relation</option>
                  {newSchema.relations.map((relation, index) => (
                    <option key={index} value={relation.name}>
                      {relation.name}
                    </option>
                  ))}
                </select>
                <select
                  value={toMention}
                  onChange={(e) => setToMention(e.target.value)}
                  className="border p-2 rounded flex-1"
                >
                  <option value="">Select mention</option>
                  {newSchema.mentions.map((mention, index) => (
                    <option key={index} value={mention.name}>
                      {mention.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={addDependency}
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Create
                </button>
              </div>
              <div className="mt-2">
                {newSchema.dependencies.map((dependency, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="bg-gray-200 px-2 py-1 rounded">
                      {dependency.fromMention}
                    </span>
                    <span>{dependency.relation}</span>
                    <span className="bg-gray-200 px-2 py-1 rounded">
                      {dependency.toMention}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={saveSchema}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save Schema
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SchemasPage
