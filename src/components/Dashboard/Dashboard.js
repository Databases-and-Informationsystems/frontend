import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import StatusFilter from "./StatusFilter";
import "./Dashboard.css";

const Dashboard = () => {
  const [projects] = useState([
    {
      title: "PET Annotations",
      schema: "PET Schema",
      team: "Annotation Team",
      progress: 65, 
      documents: {
        ongoing: [
          { name: "Doc 1", project: "PET Annotations" },
          { name: "Doc 2", project: "PET Annotations" }
        ],
        open: [{ name: "Doc 3", project: "PET Annotations" }],
        completed: [
          { name: "Doc 4", project: "PET Annotations" },
          { name: "Doc 5", project: "PET Annotations" },
          { name: "Doc 6", project: "PET Annotations" }
        ]
      }
    },
    {
      title: "BPMN Annotations",
      schema: "BPMN Schema",
      team: "BPMN Team",
      progress: 45, 
      documents: {
        ongoing: [{ name: "Doc 7", project: "BPMN Annotations" }],
        open: [{ name: "Doc 8", project: "BPMN Annotations" }],
        completed: [{ name: "Doc 9", project: "BPMN Annotations" }]
      }
    }
  ]);

  const ongoingDocuments = projects.flatMap((project) =>
    project.documents.ongoing.map((doc) => ({
      ...doc,
      schema: project.schema
    }))
  );

  const openDocuments = projects.flatMap((project) =>
    project.documents.open.map((doc) => ({
      ...doc,
      schema: project.schema
    }))
  );

  return (
    <div className="dashboard">
      <StatusFilter
        projects={projects}
        ongoingDocuments={ongoingDocuments}
        openDocuments={openDocuments}
      />
      <h1>Projects</h1>
      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
