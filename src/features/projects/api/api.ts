import { httpClient } from "./httpClients";

export const getProjects = async () => {
  try {
    const token = localStorage.getItem("token");
    

   if (!token) {
    throw new Error("Token is missing from localStorage");
  }

    return await httpClient({
      method: "GET",
      endpoint: "/projects/",
      token,
    });
  } catch (error) {
    console.error("Data not found", error);
    throw error;
  }
};

export const createProject = async (name: string, teamId: number, schemaId: number) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("	Authorization required");
    }
    return await httpClient({
      method: "POST",
      endpoint: "/projects/",
      token,
      body: {
        name,
        team_id: teamId,
        schema_id: schemaId,
      },
    });
  } catch (error) {
    console.error("Invalid input", error);
    throw error;
  }
};

export const getDocumentsByProject = async (projectId: number) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authorization required");
    }
    return await httpClient({
      method: "GET",
      endpoint: `/documents/project/${projectId}`,
      token,
    });
  } catch (error) {
    console.error("Data not found", error);
    throw error;
  }
};

export const createDocument = async (projectId: number, fileName: string, fileContent: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authorization required");
    }
    return await httpClient({
      method: "POST",
      endpoint: "/documents/",
      token,
      body: {
        project_id: projectId,
        file_name: fileName,
        file_content: fileContent,
      },
    });
  } catch (error) {
    console.error("Invalid input", error);
    throw error;
  }
};

export const deleteDocument = async (documentId: number) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("TAuthorization required");
    }
    return await httpClient({
      method: "DELETE",
      endpoint: `/documents/${documentId}`,
      token,
    });
  } catch (error) {
    console.error(" Document not found", error);
    throw error;
  }
};

export const getTeams = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authorization required");
    }
    return await httpClient({
      method: "GET",
      endpoint: "/teams/",
      token,
    });
  } catch (error) {
    console.error("Data not found", error);
    throw error;
  }
};

export const getSchemas = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authorization required");
    }
    return await httpClient({
      method: "GET",
      endpoint: "/schemas/",
      token,
    });
  } catch (error) {
    console.error("Data not found", error);
    throw error;
  }
};

  