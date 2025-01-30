import { SchemaConstraint } from "@/features/schema/types/types"
import { Mention } from "../types"



export const getMatchingConstraints = (
  mentionHead: Mention,
  mentionTail: Mention,
  schemaContraints: SchemaConstraint[] ,
) => {
  const mentionHeadSchemaId = mentionHead.schema_mention.id
  const mentionTailSchemaId = mentionTail.schema_mention.id

  if (!mentionHeadSchemaId || !mentionTailSchemaId) {
    return []
  }

  return schemaContraints.filter((constraint) => {
    const directMatch =
      constraint.is_directed &&
      constraint.schema_mention_head.id === mentionHeadSchemaId &&
      constraint.schema_mention_tail.id === mentionTailSchemaId

    const reverseMatch =
      !constraint.is_directed &&
      ((constraint.schema_mention_head.id === mentionHeadSchemaId &&
        constraint.schema_mention_tail.id === mentionTailSchemaId) ||
        (constraint.schema_mention_head.id === mentionTailSchemaId &&
          constraint.schema_mention_tail.id === mentionHeadSchemaId))

    return directMatch || reverseMatch
  })
}
