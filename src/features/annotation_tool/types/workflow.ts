export type WorkflowResponse = {
    id: number;
    schema_id: number;
    document_id: number;
    mention_model_id: number;
    entity_model_id: number;
    relation_model_id: number;
    state: State;
}

type State = {
    id: number;
    type: string;
}