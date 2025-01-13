export const getProjects = async () => {
  try {
    const token = localStorage.getItem("authToken"); 
    const response = await fetch("http://localhost:5001/api/projects/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des projets");
    }

    const data = await response.json();
    return data.projects;
  } catch (error) {
    console.error("Erreur lors de la récupération des projets", error);
    throw error;
  }
};

export const getDocumentsByProject = async (projectId: number) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`http://localhost:5001/api/documents/project/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
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
