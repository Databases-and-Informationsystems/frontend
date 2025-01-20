import { httpClient } from "./httpClient";

export const getProjects = async () => {
  try {
    const token = localStorage.getItem("authToken");

if (!token) {
  throw new Error("Token is missing from localStorage");
}

    const data = await httpClient({
      method: "GET",
      endpoint: "/projects/",
      token,
    });

    return data.projects;
  } catch (error) {
    console.error(	
      'Data not found', error);
    throw error;
  }
};


export const getDocumentsByProject = async (projectId: number) => {
  try {
    const token = localStorage.getItem("authToken");

if (!token) {
  throw new Error("Token is missing from localStorage");
}
    const data = await httpClient({
      method: "GET",
      endpoint: `/documents/project/${projectId}`,
      token,
    });

    return data;
  } catch (error) {
    console.error("Data not found", error);
    throw error;
  }
};

