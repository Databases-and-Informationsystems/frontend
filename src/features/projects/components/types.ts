
export interface Document {
  id: number;         
  name: string;      
  content: string;    
  progress: number;  
  project:Project;   
  schema: Schema;  
  status:string; 
}


export interface Documents {
  ongoing: Document[];   
  open: Document[];     
  completed: Document[]; 
}


export interface Project {
  id:number;
  title: string;         
  schema: string;        
  team: Team ;          
  documents: Documents; 
}
export interface Schema {
  id: number;
  name: string; 
}
export interface Team {
  id: number;
  name: string;
}