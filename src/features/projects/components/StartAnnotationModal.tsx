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
  ModelsByModelStep,
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
  const [modelsByModelStep, setModelsByModelStep] =
    useState<ModelsByModelStep>()
  const [selectedModelByModelStep, setSelectedModelByModelStep] = useState<
    Record<ModelStepEnum, string | undefined>
  >({
    mention: undefined,
    relation: undefined,
    entity: undefined,
  })

  const [selectedSettingsByModelStep, setSelectedSettingsByModelStepo] =
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
          const res: ModelsByModelStep = await getModelsBySchema(
            document.schema.id
          )
          setModelsByModelStep(res)

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
              defaultSelectedSettingsByModelType = {
                ...defaultSelectedSettingsByModelType,
                [step]: getDefaultSettings(res, step, model_type),
              }
            }
          }
          setSelectedModelByModelStep(defaultSelectedModelByModelType)
          setSelectedSettingsByModelStepo(defaultSelectedSettingsByModelType)
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
      const documentEdit = await createDocumentEdit(
        document.id,
        modelsByModelStep!,
        selectedModelByModelStep,
        selectedSettingsByModelStep
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
    modelsByModelStep: ModelsByModelStep,
    modelStep: ModelStepEnum,
    selectedModel: string
  ): Settings | undefined => {
    if (modelsByModelStep) {
      const modelWithSetting = modelsByModelStep[modelStep].find(
        (m) => m.model_type === selectedModel
      )
      if (modelWithSetting) {
        return modelWithSetting.settings
      }
    }
    return undefined
  }

  const getDefaultSettings = (
    modelsByModelStep: ModelsByModelStep,
    modelStep: ModelStepEnum,
    selectedModel: string
  ): Record<string, string> => {
    const settings = getSettingsByStepTypeAndModel(
      modelsByModelStep,
      modelStep,
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
    modelsByModelStep: ModelsByModelStep,
    modelStep: ModelStepEnum,
    selectedModel: string
  ) => {
    setSelectedModelByModelStep({
      ...selectedModelByModelStep,
      [modelStep]: selectedModel,
    })
    setSelectedSettingsByModelStepo({
      ...selectedSettingsByModelStep,
      [modelStep]: getDefaultSettings(
        modelsByModelStep,
        modelStep,
        selectedModel
      ),
    })
  }

  if (!isOpen) return null

  /**
   * Render Settings for am modelStep in respect to the currently selected model for this step
   * Settings can be any key value pairs
   * The values can be given in a list or by its type
   * There is a default value for each value of each key value pair that is preseleced
   */
  const renderSettings = (modelStep: ModelStepEnum): ReactNode => {
    if (!modelStep || !selectedModelByModelStep) {
      return <></>
    }
    const selectedModel = selectedModelByModelStep[modelStep as ModelStepEnum]
    if (!selectedModel) {
      return <></>
    }
    const settings = getSettingsByStepTypeAndModel(
      modelsByModelStep!,
      modelStep,
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
          if (Array.isArray(values)) {
            {
              /* value can by any of the given values in the array. These are provided in a Select form*/
            }
            return (
              <Select
                key={index}
                value={selectedSettingsByModelStep[modelStep][key]}
                onValueChange={(v) =>
                  setSelectedSettingsByModelStepo({
                    ...selectedSettingsByModelStep,
                    [modelStep]: {
                      ...selectedSettingsByModelStep[modelStep],
                      [key]: v,
                    },
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
            )
          } else {
            {
              /* value is of type values. Because values is 'number' or 'string', the input type can just be the value */
            }
            return (
              <Input
                label={key}
                key={index}
                type={values}
                value={selectedSettingsByModelStep[modelStep][key]}
                onChange={(e) =>
                  setSelectedSettingsByModelStepo({
                    ...selectedSettingsByModelStep,
                    [modelStep]: {
                      ...selectedSettingsByModelStep[modelStep],
                      [key]: e.target.value,
                    },
                  })
                }
              ></Input>
            )
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
        {modelsByModelStep &&
          Object.values(ModelStepEnum).map((modelStep) => {
            return (
              <div key={modelStep} className="border rounded p-4 mb-3">
                <h2 className="text-2xl text-bold">
                  Select model for {modelStep} prediction
                </h2>
                <div className="form-group">
                  <Select
                    value={selectedModelByModelStep[modelStep]}
                    onValueChange={(v) =>
                      handleSelectedModelByStepTypeChanged(
                        modelsByModelStep!,
                        modelStep,
                        v
                      )
                    }
                  >
                    <SelectTrigger label="Model">
                      <SelectValue placeholder="Model Placeholder" />
                    </SelectTrigger>
                    <SelectContent>
                      {modelsByModelStep[modelStep].map((model, idx) => (
                        <SelectItem key={idx} value={model.model_type}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedModelByModelStep[modelStep] &&
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
