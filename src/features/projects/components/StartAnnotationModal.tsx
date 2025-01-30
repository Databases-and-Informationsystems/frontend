import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Document } from '@/types/document'
import { ReactNode, useEffect, useState } from 'react'
import {
  ModelByStepEnum,
  ModelStepEnum,
  ModelWithSetting,
} from '../types/models'
import { Settings } from '@/types/recommendation'
import { createDocumentEdit, getModelsBySchema } from '../api/models'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import Loader from '@/components/Loader'

interface StartAnnotatingModalProps {
  isOpen: boolean
  setIsModalOpen: (value: boolean) => void
  document: Document
}

const StartAnnotatingModal: React.FC<StartAnnotatingModalProps> = ({
  isOpen,
  setIsModalOpen,
  document,
}) => {
  const navigate = useNavigate()
  const [modelsByStepType, setModelsByStepType] = useState<ModelByStepEnum>()
  const [selectedModelByModelType, setSelectedModelByModelType] = useState<
    Record<ModelStepEnum, string | undefined>
  >({
    mention: undefined,
    relation: undefined,
    entity: undefined,
  })

  const [selectedSettingsByModelType, setSelectedSettingsByModelType] =
    useState<Record<ModelStepEnum, Record<string, string>>>({
      mention: {},
      relation: {},
      entity: {},
    })

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  useEffect(() => {
    const fetchData = async () => {
      if (isOpen) {
        try {
          const res: ModelByStepEnum = await getModelsBySchema(
            document.schema.id
          )
          setModelsByStepType(res)

          /**
           * The implementation of useState does not allow to set the selectedModel and selectedSettings
           * for each successively. Therefore it is required to store the values first in other objects
           */
          let defaultSelectedModelByModelType: Record<
            ModelStepEnum,
            string | undefined
          > = { mention: undefined, relation: undefined, entity: undefined }
          let defaultSelectedSettingsByModelType: Record<
            ModelStepEnum,
            Record<string, string>
          > = { mention: {}, relation: {}, entity: {} }
          for (let step of Object.values(ModelStepEnum)) {
            if ((res[step] as ModelWithSetting[]).length === 1) {
              const model_type = res[step][0].model_type
              defaultSelectedModelByModelType = {
                ...defaultSelectedModelByModelType,
                [step]: model_type,
              }
              console.log(
                'default Settings: ',
                defaultSelectedSettingsByModelType
              )
              defaultSelectedSettingsByModelType = {
                ...defaultSelectedSettingsByModelType,
                [step]: getDefaultSettings(res, step, model_type),
              }
            }
          }
          setSelectedModelByModelType(defaultSelectedModelByModelType)
          setSelectedSettingsByModelType(defaultSelectedSettingsByModelType)
        } catch (err: any) {
          console.log('Error: ', err)
        }
      }
    }
    fetchData()
  }, [isOpen])

  const handleStartAnnotation = async () => {
    console.log('Handle Start Annotation')
    try {
      setLoading(true)
      const documentEdit = await createDocumentEdit(
        document.id,
        modelsByStepType!,
        selectedModelByModelType,
        selectedSettingsByModelType
      )
      navigate(`/annotation/${documentEdit.id}`)
    } catch (err: any) {
      console.log('Error: ', err)
      setError(err.message as string)
    } finally {
      setLoading(false)
    }
  }

  const getSettingsByStepTypeAndModel = (
    modelsByStepType: ModelByStepEnum,
    modelStepEnum: ModelStepEnum,
    selectedModel: string
  ): Settings | undefined => {
    console.log('ModelsByStepType: ', modelsByStepType)
    if (modelsByStepType) {
      const modelWithSetting = modelsByStepType[modelStepEnum].find(
        (m) => m.model_type === selectedModel
      )
      if (modelWithSetting) {
        return modelWithSetting.settings
      }
    }
    return undefined
  }

  const getDefaultSettings = (
    modelsByStepType: ModelByStepEnum,
    modelStepEnum: ModelStepEnum,
    selectedModel: string
  ): Record<string, string> => {
    const settings = getSettingsByStepTypeAndModel(
      modelsByStepType,
      modelStepEnum,
      selectedModel
    )

    if (!settings) return {}

    const defaultSettings: Record<string, string> = {}
    for (const key in settings) {
      const setting = settings[key]
      defaultSettings[key] = setting.default
    }
    return defaultSettings
  }

  const handleSelectedModelByStepTypeChanged = (
    modelsByStepType: ModelByStepEnum,
    modelStepEnum: ModelStepEnum,
    selectedModel: string
  ) => {
    setSelectedModelByModelType({
      ...selectedModelByModelType,
      [modelStepEnum]: selectedModel,
    })
    setSelectedSettingsByModelType({
      ...selectedSettingsByModelType,
      [modelStepEnum]: getDefaultSettings(
        modelsByStepType,
        modelStepEnum,
        selectedModel
      ),
    })
  }

  if (!isOpen) return null

  const renderSettings = (modelStepEnum: ModelStepEnum): ReactNode => {
    if (!modelStepEnum || !selectedModelByModelType) {
      return <></>
    }
    const selectedModel =
      selectedModelByModelType[modelStepEnum as ModelStepEnum]
    if (!selectedModel) {
      return <></>
    }
    const settings = getSettingsByStepTypeAndModel(
      modelsByStepType!,
      modelStepEnum,
      selectedModel
    )
    if (!settings) {
      return <></>
    }

    return (
      <div>
        <h3 className="text-xl mt-3">Additional optional settings</h3>
        {Object.keys(settings).map((key, index) => {
          const values = settings[key]?.values
          console.log(key, values)
          if (Array.isArray(values)) {
            return (
              <Select
                key={index}
                value={selectedSettingsByModelType[modelStepEnum][key]}
                onValueChange={(v) =>
                  setSelectedSettingsByModelType({
                    ...selectedSettingsByModelType,
                    [modelStepEnum]: {
                      ...selectedSettingsByModelType[modelStepEnum],
                      [key]: v,
                    },
                  })
                }
              >
                {/* TODO on Change */}
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
            )
          } else {
            return <Input key={index} type={values}></Input>
          }
        })}
      </div>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setIsModalOpen(false)} size="xl">
      <CardHeader>
        <CardTitle>
          <h3 className="text-xl">
            Select the prediction models with optional settings for the
            annotation process.
          </h3>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {modelsByStepType &&
          Object.values(ModelStepEnum).map((modelStep) => {
            return (
              <div key={modelStep} className="border rounded p-4 mb-3">
                <h2 className="text-2xl text-bold">
                  Select model for {modelStep} prediction
                </h2>
                <div className="form-group">
                  <Select
                    value={selectedModelByModelType[modelStep]}
                    onValueChange={(v) =>
                      handleSelectedModelByStepTypeChanged(
                        modelsByStepType!,
                        modelStep,
                        v
                      )
                    }
                  >
                    <SelectTrigger label="Model">
                      <SelectValue placeholder="Model Placeholder" />
                    </SelectTrigger>
                    <SelectContent>
                      {modelsByStepType[modelStep].map((model, idx) => (
                        <SelectItem key={idx} value={model.model_type}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedModelByModelType[modelStep] &&
                  renderSettings(modelStep)}
              </div>
            )
          })}
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
          Start Annotation
        </Button>
      </CardFooter>
    </Modal>
  )
}

export default StartAnnotatingModal
