import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getHeatmapOfDocument } from '../api/heatmap'
import { HeatmapToken } from '../types/heatmap'
import { getInterpolatedColor } from '../util/heatmapUtils'
import { Document, DocumentEdit } from '@/types/document'
import { Card, CardContent } from '@/components/ui/card'
import UserIcon from '@/components/UserIcon'

const SchemaPage = () => {
  const { id } = useParams()
  const [heatmapTokensBySentence, setHeatmapTokensBySentence] = useState<
    Record<number, HeatmapToken[]>
  >({})
  const [documentEdits, setDocumentEdits] = useState<
    Required<Pick<DocumentEdit, 'id' | 'user'>>[]
  >([])
  const [document, setDocument] = useState<Pick<Document, 'id' | 'name'>>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchHeatmap = async () => {
      try {
        if (id) {
          setLoading(true)
          const heapmapResponse = await getHeatmapOfDocument(Number(id))
          const groupedBySentence = heapmapResponse.items.reduce(
            (acc: Record<number, HeatmapToken[]>, item: HeatmapToken) => {
              const sentence_id = item.sentence_index
              if (!acc[sentence_id]) {
                acc[sentence_id] = []
              }
              acc[sentence_id].push(item)
              return acc
            },
            {} as Record<number, HeatmapToken[]>
          )
          setDocumentEdits(heapmapResponse.document_edits)
          setDocument(heapmapResponse.document)
          setHeatmapTokensBySentence(groupedBySentence)
        }
      } catch (err: any) {
        console.log('Error: ', err)
        setError(err.message as string)
      } finally {
        setLoading(false)
      }
    }

    // Only run this once when the component is mounted
    fetchHeatmap()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!Object.keys(heatmapTokensBySentence).length) {
    return <p> No tokens for the heatmap found.</p>
  }

  return (
    <div className="p-6 container space-y-6">
      {/* Schema Name as Header */}
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          Heatmap of Document <strong>{document?.name}</strong>
        </h1>
      </div>

      <Card>
        <CardContent className="p-4 space-y-2">
          <h2 className="text-xl font-semibold">Involved Users</h2>
          The heatmap was created from the annotations of the following users.
          <div className="flex flex-wrap gap-x-4">
            {documentEdits.map((de) => (
              <UserIcon user={de.user}></UserIcon>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="container">
        <CardContent className="p-4">
          {Object.entries(heatmapTokensBySentence).map(([index, sentence]) => (
            <div className="my-4">
              {sentence.map((token) => (
                <span
                  key={index}
                  className="me-2 px-1 rounded"
                  style={{
                    backgroundColor: getInterpolatedColor(token.score ?? 0),
                  }}
                >
                  {token.text}
                </span>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default SchemaPage
