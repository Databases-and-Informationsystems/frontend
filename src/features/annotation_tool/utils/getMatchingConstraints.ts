import { Mention } from "../types"
import { DependenciesSchema, MentionSchema } from "../types/schema"


export const getMatchingConstraints = (
  mentionHead: Mention,
  mentionTail: Mention,
  schemaContraints: DependenciesSchema[] ,
  schemaMentions: MentionSchema[]
) => {
  // Workaround for now, until we have the option to compare the ids
  const mentionHeadSchemaId = schemaMentions.find(
    (schemaMention) => schemaMention.tag === mentionHead.tag
  )?.id

  const mentionTailSchemaId = schemaMentions.find(
    (schemaMention) => schemaMention.tag === mentionTail.tag
  )?.id

  if (!mentionHeadSchemaId || !mentionTailSchemaId) {
    return []
  }

  return schemaContraints.filter((constraint) => {
    const directMatch =
      constraint.isDirected &&
      constraint.schema_mention_head_id === mentionHeadSchemaId &&
      constraint.schema_mention_tail_id === mentionTailSchemaId

    const reverseMatch =
      !constraint.isDirected &&
      ((constraint.schema_mention_head_id === mentionHeadSchemaId &&
        constraint.schema_mention_tail_id === mentionTailSchemaId) ||
        (constraint.schema_mention_head_id === mentionTailSchemaId &&
          constraint.schema_mention_tail_id === mentionHeadSchemaId))

    return directMatch || reverseMatch
  })
}
