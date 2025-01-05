
// This is just for testing
export type MentionSchema = {
  id: number;
  tag: string;
  color: string;
}

// This is just for testing
export type RelationSchema = {
  id: number;
  tag: string;
}

export type DependenciesSchema = {
  id: number;
  isDirected: boolean;
  schema_relation_id: number;
  schema_mention_head_id: number;
  schema_mention_tail_id: number;
}

export const MOCK_RELATION_SCHEMA: RelationSchema[] = [
  { id: 1, tag: "is performed by" },
  { id: 2, tag: "uses" },
  { id: 3, tag: "is received by" }
]

export const MOCK_MENTION_SCHEMA: MentionSchema[] = [
  { id: 1, tag: "Actor", color: "#dc2626" },
  { id: 2, tag: "Activity", color: "#3b82f6" },
  { id: 3, tag: "Activity Data", color: "#16a34a" }
]

export const MOCK_SCHEMA_DEPENDENCIES: DependenciesSchema[] = [
  { id: 1, isDirected: true, schema_relation_id: 1, schema_mention_head_id: 2, schema_mention_tail_id: 1 },
  { id: 2, isDirected: false, schema_relation_id: 2, schema_mention_head_id: 2, schema_mention_tail_id: 3 },
  { id: 3, isDirected: true, schema_relation_id: 3, schema_mention_head_id: 2, schema_mention_tail_id: 1 },
]