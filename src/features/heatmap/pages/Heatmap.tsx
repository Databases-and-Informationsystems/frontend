import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getHeatmapOfDocument } from '../api/heatmap'
import { HeatmapToken } from '../types/heatmap'
import { getInterpolatedColor } from '../util/heatmapUtils'
import { Document, DocumentEdit } from '@/types/document'
import { Card, CardContent } from '@/components/ui/card'
import UserIcon from '@/components/UserIcon'
import Page from '@/components/Page'
import PageHeader from '@/components/PageHeader'

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
    <Page>
      <PageHeader title={`Heatmap of Document ${document?.name}`} />

      <Card>
        <CardContent className="p-4 space-y-2">
          <h2 className="text-xl font-semibold">Involved Users</h2>
          The heatmap was created from the annotations of the following users.
          <div className="flex flex-wrap gap-x-4">
            {documentEdits.map((de) => (
              <UserIcon key={de.user.id} user={de.user}></UserIcon>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          {Object.entries(heatmapTokensBySentence).map(([index, sentence]) => (
            <div key={index} className="my-3 flex flex-wrap">
              {sentence.map((token) => (
                <span
                  key={token.id}
                  className="me-2 px-1 rounded mb-3"
                  style={{
                    ...(token.score != null && {
                      backgroundColor: getInterpolatedColor(token.score),
                    }),
                  }}
                >
                  {token.text}
                </span>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </Page>
  )
}

export default SchemaPage
