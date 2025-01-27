import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Schema } from '../types/types'
import { getSchemas } from '../api/schemas'
import { Button } from '@/components/ui/button'

const SchemasPage = () => {
  const [schemas, setSchemas] = useState<Schema[]>([])
  useEffect(() => {
    const fetchSchemas = async () => {
      setSchemas(await getSchemas())
    }
    fetchSchemas()
  }, [])
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Link to={`/dashboard/schemas/create`} className="fixed top-6 right-6">
        <Button>Create Schema</Button>
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Schemas
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
        {schemas.map((schema) => (
          <div
            key={schema.id}
            className={`p-4 border rounded ${
              schema.is_fixed
                ? 'bg-gray-200 dark:bg-gray-800'
                : 'bg-white dark:bg-gray-900'
            } border-gray-300 dark:border-gray-700`}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {schema.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Mentions: {schema.schema_mentions.length}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Relations: {schema.schema_relations.length}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Constraints: {schema.schema_constraints.length}
            </p>

            <div className="flex justify-end">
              <Link
                to={`/dashboard/schemas/${schema.id}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Button variant={schema.is_fixed ? 'outline' : 'default'}>
                  {schema.is_fixed ? 'View' : 'Edit'}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SchemasPage
