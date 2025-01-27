import { SchemaMention } from "@/features/schema/types/types";
import { Token } from "./token";

export type Mention = {
  id: number;
  tag: string; 
  isShownRecommendation: boolean;
  document_edit_id: number;
  document_recommendation_id: number;
  tokens: Token[];
  schema_mention: SchemaMention;
}