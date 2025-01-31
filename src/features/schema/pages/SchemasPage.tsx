import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Schema } from '@/types/schema'
import { getSchemas } from '../api/schemas'
import { Button } from '@/components/ui/button'
import Page from '@/components/Page'
import PageHeader from '@/components/PageHeader'
import StyledLink from '@/components/StyledLink'

const SchemasPage = () => {
  const [schemas, setSchemas] = useState<Schema[]>([])
  useEffect(() => {
    const fetchSchemas = async () => {
      setSchemas(await getSchemas())
    }
    fetchSchemas()
  }, [])
  return (
    <Page>
      <PageHeader title="Schemas" />
      <div className="flex flex-row-reverse">
        <Link to={`/dashboard/schemas/create`}>
          <Button>Create Schema</Button>
        </Link>
      </div>
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
              <StyledLink to={`/dashboard/schemas/${schema.id}`}>
                {schema.name}
              </StyledLink>
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
                  {schema.is_fixed ? 'View' : 'View'}{' '}
                  {/* Set to Edit if it is possible to edit schemas*/}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Page>
  )
}

export default SchemasPage
