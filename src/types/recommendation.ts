export interface RecommendationModel {
  id: number
  name: string
  type: string
  step: ModelStep
}

export interface ModelStep {
  id: number
  type: string
}

export interface RecommendationSelection {
  model_type: string
  settings: Settings
}

export interface Settings {
  [key: string]: {
    values: string[] | string // Can be an array of strings or a single string
    default: string // Must be a string
  }
}

export interface RecommendationSelections {
  mention: RecommendationSelection[]
  entity: RecommendationSelection[]
  relation: RecommendationSelection[]
}
