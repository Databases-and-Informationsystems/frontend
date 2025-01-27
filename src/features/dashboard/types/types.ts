export interface Document {
    name: string;
    project: Project;
    schema: Schema;
    state: DocumentState; 
  }
  
  export interface DocumentState {
    id: number;
    type: string;
  }
  export interface Project {
    id: number;
    name: string;
    schema: Schema;
    team: Team;
    documents: Document[]
    progress: number;
  }
  
export const STATUS_STYLES = {
  NEW: "text-green-600",
  IN_PROGRESS: "text-blue-600",
  FINISHED: "text-gray-600",
  Default: "text-black", 
};

export interface Schema {
  id: number;
  name: string; 
  
}
export interface Team {
  id: number;
  name: string;
}