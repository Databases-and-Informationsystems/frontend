
export const getProjects = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/projects/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des projets");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des projets", error);
      throw error;
    }
  };
  
  export const createProject = async (name: string, teamId: number, schemaId: number) => {
    try {
      const response = await fetch("http://localhost:5001/api/projects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name,
          team_id: teamId,
          schema_id: schemaId,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la création du projet");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la création du projet", error);
      throw error;
    }
  };
  
  export const getDocumentsByProject = async (projectId: number) => {
    try {
      const response = await fetch(`http://localhost:5001/api/documents/project/${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des documents");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des documents", error);
      throw error;
    }
  };
  
  export const createDocument = async (projectId: number, fileName: string, fileContent: string) => {
    try {
      const response = await fetch("http://localhost:5001/api/documents/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          project_id: projectId,
          file_name: fileName,
          file_content: fileContent,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la création du document");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la création du document", error);
      throw error;
    }
  };
  
  export const deleteDocument = async (documentId: number) => {
    try {
      const response = await fetch(`http://localhost:5001/api/documents/${documentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du document");
      }
  
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de la suppression du document", error);
      throw error;
    }
  };

export const getTeams = async (): Promise<any[]> => {
    try {
      const response = await fetch('http://localhost:5001/api/teams/', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des équipes");
      }
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la récupération des équipes", error);
      throw error;
    }
  };
  
  
  export const getSchemas = async (): Promise<any[]> => {
    try {
      const response = await fetch('http://localhost:5001/api/schemas/', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des schémas");
      }
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la récupération des schémas", error);
      throw error;
    }
  };
  