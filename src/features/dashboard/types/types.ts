export interface Document {
    name: string;
    project: Project;
    schema: Schema;
    status: string; 
    progress?: number; 
  }
  
  export interface Project {
    id: number;
    title: string;
    schema: Schema;
    team: Team;
    documents: {
      ongoing: Document[];
      open: Document[];
      completed: Document[];
    };
    progress: number;
  }
  
export const STATUS_STYLES = {
  Ongoing: "text-green-600",
  Open: "text-blue-600",
  Completed: "text-gray-600",
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