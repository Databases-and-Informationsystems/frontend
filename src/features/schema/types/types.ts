import { Team } from "@/features/dashboard/types/types";

export interface Schema {
    id: number;
    name: string;
    team: Team;
    is_fixed: boolean
    schema_mentions: SchemaMention[];
    schema_relations: SchemaRelation[];
    schema_constraints: SchemaConstraint[];
}

export interface SchemaMention {
    id: number;
    tag: string;
    description: string;
    color: string;
    entityPossible: boolean
}

export interface SchemaRelation {
    id: number;
    tag: string;
    description: string;
}
export interface SchemaConstraint {
    id: number;
    is_directed: boolean;
    schema_relation: Partial<SchemaRelation> & {id: number}; 
    schema_mention_head: Partial<SchemaMention> & {id: number};
    schema_mention_tail: Partial<SchemaMention> & {id: number};
}