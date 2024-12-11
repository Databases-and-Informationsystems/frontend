import { Token, Mention, Relation } from "@/features/annotation_tool/types";

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


export const MOCK_TOKENS: Token[] = [
  { id: 1, text: "The", index_in_document: 0, pos_tag: "DT", bio_tag: "B-Actor", sentence_index: 0 },
  { id: 2, text: "MSPN", index_in_document: 1, pos_tag: "NNP", bio_tag: "I-Actor", sentence_index: 0 },
  { id: 3, text: "registers", index_in_document: 2, pos_tag: "VBZ", bio_tag: "B-Activity", sentence_index: 0 },
  { id: 4, text: "the", index_in_document: 3, pos_tag: "DT", bio_tag: "B-Activity_Data", sentence_index: 0 },
  { id: 5, text: "measurement", index_in_document: 4, pos_tag: "NN", bio_tag: "I-Activity_Data", sentence_index: 0 },
  { id: 6, text: "at", index_in_document: 5, pos_tag: "IN", bio_tag: "O", sentence_index: 0 },
  { id: 7, text: "the", index_in_document: 6, pos_tag: "DT", bio_tag: "B-Actor", sentence_index: 0 },
  { id: 8, text: "GO", index_in_document: 7, pos_tag: "NN", bio_tag: "I-Actor", sentence_index: 0 },
  { id: 9, text: ".", index_in_document: 8, pos_tag: ".", bio_tag: "O", sentence_index: 0},
  { id: 10, text: "The", index_in_document: 0, pos_tag: "DT", bio_tag: "B-Actor", sentence_index: 1 },
  { id: 11, text: "MSPN", index_in_document: 1, pos_tag: "NNP", bio_tag: "I-Actor", sentence_index: 1 },
  { id: 12, text: "registers", index_in_document: 2, pos_tag: "VBZ", bio_tag: "B-Activity", sentence_index: 1 },
  { id: 13, text: "the", index_in_document: 3, pos_tag: "DT", bio_tag: "B-Activity_Data", sentence_index: 1 },
  { id: 14, text: "measurement", index_in_document: 4, pos_tag: "NN", bio_tag: "I-Activity_Data", sentence_index: 1 },
  { id: 15, text: "at", index_in_document: 5, pos_tag: "IN", bio_tag: "O", sentence_index: 1 },
  { id: 16, text: "the", index_in_document: 6, pos_tag: "DT", bio_tag: "B-Actor", sentence_index: 1 },
  { id: 17, text: "GO", index_in_document: 7, pos_tag: "NN", bio_tag: "I-Actor", sentence_index: 1 },
  { id: 18, text: ".", index_in_document: 8, pos_tag: ".", bio_tag: "O", sentence_index: 1 }
]

export const MOCK_MENTIONS: Mention[] = [
  { id: 1, tag: "Actor", isShownRecommendation: true, token_ids: [1, 2] },
  { id: 2, tag: "Activity", isShownRecommendation: true, token_ids: [3] },
  { id: 3, tag: "Activity Data", isShownRecommendation: true, token_ids: [4, 5] },
  { id: 4, tag: "Actor", isShownRecommendation: true, token_ids: [7, 8] },
  { id: 5, tag: "Actor", isShownRecommendation: true, token_ids: [10, 11] },
  { id: 6, tag: "Activity", isShownRecommendation: true, token_ids: [12] },
  { id: 7, tag: "Activity Data", isShownRecommendation: true, token_ids: [13, 14] },
  { id: 8, tag: "Actor", isShownRecommendation: true, token_ids: [16, 17] }     
]

export const MOCK_RELATIONS: Relation[] = [
  { id: 1, tag: "is performed by", isDirected: false, isShownRecommendation: true, mention_head_id: 2, mention_tail_id: 1 },
  { id: 2, tag: "uses", isDirected: true, isShownRecommendation: true, mention_head_id: 2, mention_tail_id: 3 },
  { id: 3, tag: "is received by", isDirected: false, isShownRecommendation: true, mention_head_id: 2, mention_tail_id: 4 },
  { id: 4, tag: "is performed by", isDirected: false, isShownRecommendation: true, mention_head_id: 6, mention_tail_id: 5 },
  { id: 5, tag: "uses", isDirected: true, isShownRecommendation: true, mention_head_id: 6, mention_tail_id: 7 },
  { id: 6, tag: "is received by", isDirected: false, isShownRecommendation: true, mention_head_id: 6, mention_tail_id: 8 },
]

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
  { id: 1, isDirected: false, schema_relation_id: 1, schema_mention_head_id: 2, schema_mention_tail_id: 1 },
  { id: 2, isDirected: true, schema_relation_id: 2, schema_mention_head_id: 2, schema_mention_tail_id: 3 },
  { id: 3, isDirected: false, schema_relation_id: 3, schema_mention_head_id: 2, schema_mention_tail_id: 1 },
]