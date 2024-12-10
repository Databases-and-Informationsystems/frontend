export interface Document {
    name: string;
    project: string;
    schema: string;
    status?: string; 
    progress?: number; 
  }
  
  export interface Project {
    title: string;
    schema?: string;
    documents: {
      ongoing: Document[];
      open: Document[];
      completed: Document[];
    };
  }
  