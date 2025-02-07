/*export interface ModelsByStepType {
  mention: ModelWithSetting[]
  relation: ModelWithSetting[]
  entity: ModelWithSetting[]
}*/

import { Settings } from '@/types/recommendation'

/**
 * The corresponding response has the following format:
 *
 * ```ts
 * {
 *    mention: [{model_type: "", name: "", id: 0, settings: {}}]
 *    relation: [{model_type: "", name: "", id: 0, settings: {}}]
 *    entity: [{model_type: "", name: "", id: 0, settings: {}}]
 * }
 * ```
 */
export type ModelsByModelStep = Record<ModelStepEnum, ModelWithSetting[]>

/**
 * The Model_Types with their settings are provided in a response with 3 objects
 * `mention`, `relation` and `entity`. (Represented in the `ModelsByModelStep` type)
 *
 * To use a more generic approach, these 3 objects are represented with these enum type using a Record
 *
 * @see ModelsByModelStep
 */
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
