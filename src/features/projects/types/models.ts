/*export interface ModelsByStepType {
  mention: ModelWithSetting[]
  relation: ModelWithSetting[]
  entity: ModelWithSetting[]
}*/

import { Settings } from '@/types/recommendation'

export type ModelsByModelStep = Record<ModelStepEnum, ModelWithSetting[]>

export enum ModelStepEnum {
  mention = 'mention',
  relation = 'relation',
  entity = 'entity',
}

export interface ModelWithSetting {
  model_type: string
  name: string
  id: number
  settings: Settings
}
