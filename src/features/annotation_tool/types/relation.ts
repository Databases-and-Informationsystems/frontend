import { SchemaRelation } from "@/features/schema/types/types";
import { Mention } from "./mention";

export type Relation = {
    id: number;
    isDirected: boolean;
    tag: string;
    isShownRecommendation: boolean;
    head_mention: Mention;
    tail_mention: Mention;
    schema_relation: SchemaRelation;
    document_edit_id: number;
    document_recommendation_id: number;
}

export type CreateRelationPayload = {
    schema_relation_id: number;
    document_edit_id: number;
    isDirected: boolean;
    mention_head_id: number;
    mention_tail_id: number;
}

export type UpdateRelationPayload = {
    schema_relation_id: number;
    isDirected: boolean;
    mention_head_id: number;
    mention_tail_id: number;
}