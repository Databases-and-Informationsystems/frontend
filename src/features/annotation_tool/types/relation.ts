import { SchemaRelation } from "@/features/schema/types/types";
import { Token } from "./token";

export type Relation = {
    id: number;
    isDirected: boolean;
    tag: string;
    isShownRecommendation: boolean;
    head_mention: HeadMention;
    tail_mention: TailMention;
    schema_relation: SchemaRelation;
    document_edit_id: number;
    document_recommendation_id: number;
}

export type HeadMention = {
    tag: string;
    tokens: Token[];
    entity: number;
}

export type TailMention = {
    tag: string;
    tokens: Token[];
    entity: number;
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