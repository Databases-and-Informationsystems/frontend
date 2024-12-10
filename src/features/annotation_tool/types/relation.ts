export type Relation = {
    id: number;
    tag: string;
    isDirected: boolean;
    isShownRecommendation: boolean;
    mention_head_id: number;
    mention_tail_id: number;
}