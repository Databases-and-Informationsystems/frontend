export type MentionSchema = {
  id: string
  tag: string
  color: string
}

export type RelationSchema = {
  id: string
  tag: string
}

export type DependenciesSchema = {
  id: string
  isDirected: boolean
  schema_relation_id: string
  schema_mention_head_id: string
  schema_mention_tail_id: string
}

export interface Schema {
    mentions: MentionSchema[]
    relations: RelationSchema[]
    dependencies: DependenciesSchema[]
}
