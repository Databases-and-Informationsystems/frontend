import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import StatusFilter from "./StatusFilter";
import { getProjects, getDocumentsByProject } from "../api/api";

interface Document {
  name: string;
  project: string;
  schema: string;
  document_edit_state: string; 
}

interface Project {
  id: number;
  title: string;
  schema: string;
  team: string;
  progress: number;
  documents: {
    ongoing: Document[];
    open: Document[];
    completed: Document[];
  };
}

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectsAndDocuments = async () => {
      try {
        const projectsData = await getProjects(); 
        console.log("Projets récupérés:", projectsData);

    
        const projectsWithDocuments = await Promise.all(
          projectsData.map(async (project: any) => {
            const documents = await getDocumentsByProject(project.id);
            console.log("Documents récupérés pour le projet:", documents);

            return {
              ...project,
              documents: {
                ongoing: documents.filter(
                  (doc: any) => doc.document_edit_state === "ongoing"
                ),
                open: documents.filter(
                  (doc: any) => doc.document_edit_state === "open"
                ),
                completed: documents.filter(
                  (doc: any) => doc.document_edit_state === "completed"
                ),
              },
            };
          })
        );

        setProjects(projectsWithDocuments);
      } catch (error) {
        console.error("Erreur lors du chargement des projets et documents", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsAndDocuments();
  }, []);

  if (loading) {
    return <div>Chargement des projets...</div>;
  }

  return (
    <div className="dashboard p-6">
      <StatusFilter projects={projects} />
      <h1 className="text-2xl font-bold mt-6 mb-4">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
