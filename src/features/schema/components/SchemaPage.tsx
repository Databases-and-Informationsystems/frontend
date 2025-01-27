import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSchema } from '../api/schemas'
import { RecommendationModel, Schema } from '../types/types'

interface StepWithModels {
  stepName: string
  models: RecommendationModel[]
}
const SchemaPage = () => {
  const { id } = useParams()
  const [schema, setSchema] = useState<Schema | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | undefined>(undefined)

  const [modelsByStep, setModelsByStep] = useState<any>([])

  const fetchSchema = async () => {
    try {
      if (id) {
        setLoading(true)
        const fetchedSchema = await getSchema(Number(id))
        setSchema(fetchedSchema)
        const groupedByStep = fetchedSchema.models.reduce(
          (acc: Record<number, StepWithModels>, model) => {
            const stepId = model.step.id
            if (!acc[stepId]) {
              acc[stepId] = {
                stepName: model.step.type,
                models: [],
              }
            }
            acc[stepId].models.push(model)
            return acc
          },
          {} as Record<number, StepWithModels>
        )
        setModelsByStep(groupedByStep)
      }
    } catch (err: any) {
      console.log('Error: ', err)
      setError(err.message as string)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Only run this once when the component is mounted
    fetchSchema()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!schema) {
    return <p> No schema found.</p>
  }

  const renderArrow = (direction: 'left' | 'right') => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`w-6 h-6 ${direction === 'left' ? 'transform rotate-180' : ''}`}
    >
      <path d="M12 2v20M5 12l7-7 7 7" />
    </svg>
  )

  return (
    <div className="p-6 container space-y-6">
      {/* Schema Name as Header */}
      <div className="p-4 bg-gray-100 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">{schema.name}</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
        {Object.keys(modelsByStep).map((stepId) => (
          <div
            key={stepId}
            className={`w-full p-4 bg-gray-50 rounded-lg shadow-md`}
          >
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              {modelsByStep[stepId].stepName}
            </h2>
            <div className="space-y-4">
              {modelsByStep[stepId].models.map((model: RecommendationModel) => (
                <div
                  key={model.id}
                  className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <h3 className="text-lg font-medium text-gray-800">
                    {model.name}
                  </h3>
                  <p className="text-gray-600">Type: {model.type}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Schema Mentions */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Mentions</h2>
        <div className="space-y-4">
          {schema.schema_mentions.map((mention) => (
            <div
              key={mention.id}
              className="flex items-center space-x-4 p-4 border rounded-lg"
            >
              {/* Color Box */}
              <div
                className="w-6 h-6 rounded min-w-[1.5rem]"
                style={{ backgroundColor: mention.color }}
              ></div>
              {/* Tag and Description */}
              <div>
                <div className="text-lg font-semibold">{mention.tag}</div>
                <div className="text-gray-500">{mention.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schema Relations */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Relations</h2>
        <div className="space-y-4">
          {schema.schema_relations.map((relation) => (
            <div
              key={relation.id}
              className="flex flex-col space-y-1 p-4 border rounded-lg"
            >
              <div className="text-lg font-semibold">{relation.tag}</div>
              <div className="text-gray-500">{relation.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Schema Constraints */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Constraints</h2>
        <div className="space-y-4">
          {schema.schema_constraints
            .sort((a, b) =>
              a.schema_relation.tag!.localeCompare(b.schema_relation.tag!)
            )
            .map((constraint) => (
              <div
                key={constraint.id}
                className="grid grid-cols-3 items-center p-4 border rounded-lg bg-white shadow-md"
              >
                {/* Head Mention Tag (Left) */}
                <div className="flex items-center justify-start space-x-4">
                  <div
                    className="w-6 h-6 rounded min-w-[1.5rem]"
                    style={{
                      backgroundColor: constraint.schema_mention_head.color,
                    }}
                  ></div>
                  <div className="text-lg font-semibold">
                    {constraint.schema_mention_head.tag}
                  </div>
                </div>

                {/* Relation Tag (Center) */}
                <div className="flex justify-center items-center space-x-2">
                  {!constraint.is_directed && renderArrow('right')}
                  <div className="text-lg font-semibold">
                    {constraint.schema_relation.tag}
                  </div>
                  {!constraint.is_directed && renderArrow('left')}
                </div>

                {/* Tail Mention Tag (Right) */}
                <div className="flex items-center justify-end space-x-4">
                  <div className="text-lg font-semibold">
                    {constraint.schema_mention_tail.tag}
                  </div>
                  <div
                    className="w-6 h-6 rounded min-w-[1.5rem]"
                    style={{
                      backgroundColor: constraint.schema_mention_tail.color,
                    }}
                  >
                    {' '}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default SchemaPage
