import { Mention } from "./mention";
import { Relation } from "./relation";

export type DocumentEdit = {
    document: Document;
    mentions: Mention[];
    relations: Relation[];
    schema_id: number;
}

type Document = {
    id: number;
    name: string;
}