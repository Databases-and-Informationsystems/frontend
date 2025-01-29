import { RecommendationModel } from './recommendation'
import { Team } from './user'

export interface Schema {
  id: number
  name: string
  team: Team
  is_fixed: boolean
  models: RecommendationModel[]
  schema_mentions: SchemaMention[]
  schema_relations: SchemaRelation[]
  schema_constraints: SchemaConstraint[]
}

export interface SchemaMention {
  id: number
  tag: string
  description: string
  color: string
  entityPossible: boolean
}

export interface SchemaRelation {
  id: number
  tag: string
  description: string
}
export interface SchemaConstraint {
  id: number
  is_directed: boolean
  schema_relation: Partial<SchemaRelation> & { id: number }
  schema_mention_head: Partial<SchemaMention> & { id: number }
  schema_mention_tail: Partial<SchemaMention> & { id: number }
}

export interface NewConstraint {
  is_directed: boolean
  mention_head_tag: string
  relation_tag: string
  mention_tail_tag: string
}

// The following is bad practice but required because of the structure of the backend api...
export interface SchemaWrapper {
  schemas: Schema[]
}
