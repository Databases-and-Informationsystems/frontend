import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ReactNode, useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import Loader from '@/components/Loader'
import { Schema } from '@/types/schema'
import { ModelStepType } from '../types/model'
import { getDocumentEditsBySchema, getTrainSettings } from '../api/schemas'
import { DocumentEdit } from '@/types/document'
import { ModelWithSetting } from '@/features/projects/types/models'
import { Checkbox } from '@/components/ui/checkbox'
import UserIcon from '@/components/UserIcon'
import { translateDocumentEditState } from '@/features/projects/util/document_util'
import { cn } from '@/lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface TrainModelModalProps {
  isOpen: boolean
  setIsModalOpen: (value: boolean) => void
  schema: Schema
  modelStepType: ModelStepType
}

const TrainModelModal: React.FC<TrainModelModalProps> = ({
  isOpen,
  setIsModalOpen,
  schema,
  modelStepType,
}) => {
  const [selectedSettings, setSelectedSettings] = useState<
    Record<string, string>
  >({})

  const [documentEdits, setDocumentEdits] = useState<DocumentEdit[]>([])
  const [modelTypesWithSettings, setModelTypesWithSettings] = useState<
    Omit<ModelWithSetting, 'id' | 'name'>[]
  >([])

  const [selectedModelType, setSelectedModelType] = useState<string>()
  const [selectedDocuments, setSelectedDocuments] = useState<
    Record<number, boolean>
  >({})

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  useEffect(() => {
    const fetchData = async () => {
      if (isOpen) {
        try {
          const [settings, documentEdits] = await Promise.all([
            getTrainSettings(schema, modelStepType),
            getDocumentEditsBySchema(schema),
          ])
          setModelTypesWithSettings(settings)
          setDocumentEdits(documentEdits)

          setSelectedDocuments(
            documentEdits.reduce(
              (acc, doc) => {
                acc[doc.id!] = false
                return acc
              },
              {} as Record<number, boolean>
            )
          )
        } catch (err: any) {
          console.log('Error: ', err)
          setError(err.message as string)
        }
      }
    }
    fetchData()
  }, [isOpen])

  const handleStartAnnotation = async () => {
    try {
      setLoading(true)
      // TODO start training
    } catch (err: any) {
      console.log('Error: ', err)
      setError(err.message as string)
    } finally {
      setLoading(false)
    }
  }

  const handleDocumentSelect = (id: number) => {
    setSelectedDocuments((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleSelectAll = () => {
    const allSelected = Object.values(selectedDocuments).every(Boolean)
    setSelectedDocuments(
      Object.fromEntries(documentEdits.map((doc) => [doc.id, !allSelected]))
    )
  }

  const getDuplicateWarnings = () => {
    const documentCount: Record<number, number> = {}
    Object.keys(selectedDocuments).forEach((id) => {
      const docId = documentEdits.find((d) => d.id === Number(id))?.document.id
      if (docId) {
        documentCount[docId] =
          (documentCount[docId] || 0) + (selectedDocuments[Number(id)] ? 1 : 0)
      }
    })
    return Object.fromEntries(
      Object.entries(documentCount).filter(([, count]) => count > 1)
    )
  }

  const duplicateWarnings = getDuplicateWarnings()

  const renderSettings = (): ReactNode => {
    if (!selectedModelType) {
      return <></>
    }

    const settings = modelTypesWithSettings.find(
      (modelTypeWithSettings) =>
        modelTypeWithSettings.model_type === selectedModelType
    )?.settings

    if (!settings) {
      return <></>
    }

    return (
      <div>
        {Object.keys(settings).length ? (
          <h3 className="text-xl mt-3">Additional optional settings</h3>
        ) : (
          <></>
        )}
        <div className="flex flex-col gap-2">
          {Object.keys(settings).map((key, index) => {
            const values = settings[key]?.values
            if (Array.isArray(values)) {
              {
                /* value can by any of the given values in the array. These are provided in a Select form*/
              }
              return (
                <div>
                  <Select
                    key={index}
                    value={selectedSettings[key]}
                    onValueChange={(v) =>
                      setSelectedSettings({
                        ...selectedSettings,
                        [key]: v,
                      })
                    }
                  >
                    <SelectTrigger label={key}>
                      <SelectValue placeholder="Select value" />
                    </SelectTrigger>
                    <SelectContent>
                      {(settings[key].values as string[]).map((v, index) => (
                        <SelectItem key={index} value={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )
            } else if (values == 'boolean') {
              return (
                <div className="mt-2">
                  {/* Checkbox has margin top because there is no label on the top of the checkbox */}
                  <Checkbox
                    label={key}
                    key={index}
                    value={selectedSettings[key]}
                    onChange={(v) =>
                      setSelectedSettings({
                        ...selectedSettings,
                        [key]: String(v),
                      })
                    }
                  ></Checkbox>
                </div>
              )
            } else {
              {
                /* value is of type values. Because values is 'number' or 'string', the input type can just be the value */
              }
              return (
                <div>
                  <Input
                    label={key}
                    key={index}
                    type={values}
                    value={selectedSettings[key]}
                    onChange={(e) =>
                      setSelectedSettings({
                        ...selectedSettings,
                        [key]: e.target.value,
                      })
                    }
                  ></Input>
                </div>
              )
            }
          })}
        </div>
      </div>
    )
  }

  return (
    <Modal
      title={`Train ${modelStepType} prediction model `}
      description={`Select the documents that should be used for training as well as a model and its settings to train a custom model for the schema '${schema.name}'`}
      isOpen={isOpen}
      onClose={() => setIsModalOpen(false)}
      size="xl"
    >
      <CardContent>
        <div>
          <Select
            value={selectedModelType}
            onValueChange={(v) => setSelectedModelType(v)}
          >
            <SelectTrigger label="Model">
              <SelectValue placeholder="select model" />
            </SelectTrigger>
            <SelectContent>
              {modelTypesWithSettings.map((model, idx) => (
                <SelectItem key={idx} value={model.model_type}>
                  {model.model_type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedModelType && renderSettings()}
        </div>

        <div className="mt-4 ">
          <Button onClick={handleSelectAll} className="mb-4">
            Select All Annotations
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {documentEdits.map((documentEdit) => {
              return (
                <Card
                  key={documentEdit.id}
                  className={cn(
                    'p-4 flex items-center justify-between cursor-pointer transition-all',
                    selectedDocuments[documentEdit.id!]
                      ? 'bg-blue-100'
                      : 'bg-white'
                  )}
                  onClick={() => handleDocumentSelect(documentEdit.id!)}
                >
                  <div className="flex items-center gap-3">
                    <UserIcon user={documentEdit.user!} popover={false} />
                    <div>
                      <strong>{documentEdit.document.name}</strong>
                      <span className="block text-sm text-gray-500">
                        {translateDocumentEditState(documentEdit.state.type)}
                      </span>
                    </div>
                    {duplicateWarnings[documentEdit.document.id] && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <FontAwesomeIcon
                              icon={faInfoCircle}
                              className="ml-2 transition-transform duration-200 text-red-500"
                            ></FontAwesomeIcon>
                          </TooltipTrigger>
                          <TooltipContent>
                            <span className="text-sm">
                              Duplicate document selected. This might cause a
                              false balancing of the training data
                            </span>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>

      <CardFooter className="flex justify-end gap-3">
        <Button onClick={() => setIsModalOpen(false)} variant="secondary">
          Cancel
        </Button>
        <Button onClick={() => handleStartAnnotation()} disabled={loading}>
          {loading && <Loader />}
          Train Model
        </Button>
      </CardFooter>
    </Modal>
  )
}

export default TrainModelModal
