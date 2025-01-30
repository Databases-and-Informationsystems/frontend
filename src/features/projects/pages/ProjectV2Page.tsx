import { Document, DocumentStateType } from '@/types/document'
import {
  createDocument,
  deleteDocument,
  getDocumentsByProject,
  getProjectById,
} from '../api/projects'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Project } from '@/types/project'
import Page from '@/components/Page'
import PageHeader from '@/components/PageHeader'
import { Separator } from '@/components/ui/separator'
import { translateDocumentState } from '../util/document_util'

import DocumentCard from '../components/DocumentCard'
import { Button } from '@/components/ui/button'

const initialGroupedDocuments: Record<DocumentStateType, Document[]> = {
  [DocumentStateType.NEW]: [],
  [DocumentStateType.IN_PROGRESS]: [],
  [DocumentStateType.FINISHED]: [],
}

const ProjectV2Page: React.FC = () => {
  const { id } = useParams()

  console.log(id)

  const [project, setProject] = useState<Project>()
  const [documentsByState, setDocumentsByState] = useState<
    Record<DocumentStateType, Document[]>
  >(initialGroupedDocuments)

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [projectData, documentsData] = await Promise.all([
          getProjectById(Number(id)),
          getDocumentsByProject(Number(id)),
        ])

        const groupedDocuments = documentsData.reduce<
          Record<DocumentStateType, Document[]>
        >(
          (acc, doc) => {
            acc[doc.state.type].push(doc)
            return acc
          },
          {
            [DocumentStateType.NEW]: [],
            [DocumentStateType.IN_PROGRESS]: [],
            [DocumentStateType.FINISHED]: [],
          }
        )
        console.log(projectData)

        setDocumentsByState(groupedDocuments)

        setProject(projectData)
      } catch (err: any) {
        console.error('Error fetching initial data:', err)
        setError(err.message as string)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleAddDocument = async (name: string, content: string) => {
    try {
      const newDoc = await createDocument(Number(id), name, content)
      newDoc.document_edits = []
      setDocumentsByState((prev) => ({
        ...prev,
        [DocumentStateType.NEW]: [...prev[DocumentStateType.NEW], newDoc],
      }))
    } catch (error) {
      console.error('Error adding document:', error)
    }
  }

  const handleDeleteDocument = async (
    id: number,
    documentStateType: DocumentStateType
  ) => {
    try {
      await deleteDocument(id)
      setDocumentsByState((prev) => ({
        ...prev,
        [documentStateType]: prev[documentStateType].filter((d) => d.id !== id),
      }))
    } catch (error) {
      console.error('Error deleting document:', error)
    }
  }

  if (loading || !project) {
    return <div>Loading Project #{id}...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <Page>
      <PageHeader title={`Project ${project.name}`} />
      <div className="grid gap-2">
        <div className="grid grid-cols-12">
          <span className="lg:col-span-1 col-span-3 font-bold">Team:</span>
          <span className="lg:col-span-11 col-span-9">{project.team.name}</span>
        </div>
        <Separator />
        <div className="grid grid-cols-12">
          <span className="lg:col-span-1 col-span-3 font-bold">Schema:</span>
          <span className="lg:col-span-11 col-span-9">
            {project.schema.name}
          </span>
        </div>
        <Separator />
        <div className="grid grid-cols-12">
          <span className="lg:col-span-1 col-span-3 font-bold">Creator:</span>
          <span className="lg:col-span-11 col-span-9">
            {project.creator.username}
          </span>
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <Button>Add Document</Button> {/* TODO Not Implemented yet */}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-3 items-start">
        {Object.keys(documentsByState).map((state) => (
          <div key={state}>
            <h2 className="text-center text-xl font-bold py-5">
              {translateDocumentState(state as DocumentStateType)}
            </h2>
            <div key={state} className="grid gap-y-3">
              {documentsByState[state as keyof typeof documentsByState].map(
                (document) => (
                  <DocumentCard
                    key={document.id}
                    document={document}
                    onDeleteDocument={handleDeleteDocument}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </Page>
  )
}

export default ProjectV2Page
