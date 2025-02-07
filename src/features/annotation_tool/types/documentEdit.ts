import { Mention } from "./mention";
import { Relation } from "./relation";

export type DocumentEdit = {
    document: Document;
    mentions: Mention[];
    relations: Relation[];
    schema_id: number;
    state: State;

}

type Document = {
    id: number;
    name: string;
}

type State = {
    id: number;
    type: string;
}