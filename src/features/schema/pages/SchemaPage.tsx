import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSchema } from '../api/schemas'
import { Schema } from '@/types/schema'
import { RecommendationModel } from '@/types/recommendation'
import Page from '@/components/Page'
import PageHeader from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { ModelStepType } from '../types/model'
import TrainModelModal from '../components/TrainModelModal'
import SchemaConstraint from '../components/SchemaConstraint'

interface StepWithModels {
  stepName: string
  models: RecommendationModel[]
}
const SchemaPage = () => {
  const { id } = useParams()
  const [schema, setSchema] = useState<Schema | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | undefined>(undefined)

  const [modelStepToTrain, setModelStepToTrain] = useState<ModelStepType>(
    ModelStepType.mentions
  )
  const [trainModelModalOpen, setTrainModelModalOpen] = useState<boolean>(false)

  const [modelsByStep, setModelsByStep] = useState<any>([])

  const fetchSchema = async () => {
    try {
      if (id) {
        setLoading(true)
        const fetchedSchema = await getSchema(Number(id))
        setSchema(fetchedSchema)
        const groupedByStep = fetchedSchema.models.reduce(
          (acc: Record<number, StepWithModels>, model: RecommendationModel) => {
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
        console.log('groupedByStep: ', groupedByStep)
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
    <Page>
      {/* Schema Name as Header */}
      <PageHeader title={schema.name} />

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
        {Object.keys(modelsByStep).map((stepId) => (
          <div
            key={stepId}
            className="w-full p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md flex flex-col"
          >
            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">
              {modelsByStep[stepId].stepName}
            </h2>
            <div className="space-y-4">
              {modelsByStep[stepId].models.map((model: RecommendationModel) => (
                <div
                  key={model.id}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                    {model.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Type: {model.type}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex mt-auto">
              <Button
                className="mx-auto mt-4"
                onClick={() => {
                  setModelStepToTrain(
                    modelsByStep[stepId].stepName as ModelStepType
                  )
                  setTrainModelModalOpen(true)
                }}
              >
                Train Model
              </Button>
            </div>
          </div>
        ))}
      </div>
      <TrainModelModal
        isOpen={trainModelModalOpen}
        setIsModalOpen={setTrainModelModalOpen}
        schema={schema}
        modelStepType={modelStepToTrain}
      ></TrainModelModal>

      {/* Schema Mentions */}
      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Mentions
        </h2>
        <div className="space-y-4">
          {schema.schema_mentions.map((mention) => (
            <div
              key={mention.id}
              className="flex items-center space-x-4 p-4 border rounded-lg dark:border-gray-700"
            >
              {/* Color Box */}
              <div
                className="w-6 h-6 rounded min-w-[1.5rem]"
                style={{ backgroundColor: mention.color }}
              ></div>
              {/* Tag and Description */}
              <div>
                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {mention.tag}
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  {mention.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schema Relations */}
      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Relations
        </h2>
        <div className="space-y-4">
          {schema.schema_relations.map((relation) => (
            <div
              key={relation.id}
              className="flex flex-col space-y-1 p-4 border rounded-lg dark:border-gray-700"
            >
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {relation.tag}
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                {relation.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schema Constraints */}
      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Constraints
        </h2>
        <div className="space-y-4">
          {schema.schema_constraints
            .sort((a, b) =>
              a.schema_relation.tag!.localeCompare(b.schema_relation.tag!)
            )
            .map((constraint) => (
              <SchemaConstraint
                key={constraint.id}
                mention_head_color={constraint.schema_mention_head.color}
                mention_head_tag={constraint.schema_mention_head.tag}
                relation_tag={constraint.schema_relation.tag}
                is_directed={constraint.is_directed}
                mention_tail_color={constraint.schema_mention_tail.color}
                mention_tail_tag={constraint.schema_mention_tail.tag}
              />
            ))}
        </div>
      </div>
    </Page>
  )
}

export default SchemaPage
