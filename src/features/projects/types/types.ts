import { DocumentState } from "@/features/dashboard/types/types";

export interface Document {
  id: number;         
  name: string;      
  content: string;    
  progress: number;  
  project:Project;   
  schema: Schema;  
  status: DocumentState; 
}


export interface Project {
  id:number;
  name: string;         
  schema: Schema;        
  team: Team ;          
  documents?: Document[]; 
}
export interface Schema {
  id: number;
  name: string; 
}
export interface Team {
  id: number;
  name: string;
}


// The following is very bad practice but required because of the structure of the backend api...
export interface TeamsWrapper {
  teams: Team[];
}

export interface ProjectWrapper {
  projects: Project[];
}

export interface SchemaWrapper {
  schemas: Schema[];
}

export interface DocumentWrapper {
  documents: Document[];
}