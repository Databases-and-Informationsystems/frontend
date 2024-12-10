import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import StatusFilter from "./StatusFilter";

interface Document {
  name: string;
  project: string;
  schema: string;
}

interface Project {
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
  const [projects] = useState<Project[]>([
    {
      title: "PET Annotations",
      schema: "PET Schema",
      team: "Annotation Team",
      progress: 65,
      documents: {
        ongoing: [
          { name: "Doc 1", project: "PET Annotations", schema: "PET Schema" },
        ],
        open: [
          { name: "Doc 3", project: "PET Annotations", schema: "PET Schema" },
        ],
        completed: [
          { name: "Doc 4", project: "PET Annotations", schema: "PET Schema" },
        ],
      },
    },
    {
      title: "BPMN Annotations",
      schema: "BPMN Schema",
      team: "BPMN Team",
      progress: 45,
      documents: {
        ongoing: [
          { name: "Doc 7", project: "BPMN Annotations", schema: "BPMN Schema" },
        ],
        open: [
          { name: "Doc 8", project: "BPMN Annotations", schema: "BPMN Schema" },
        ],
        completed: [
          { name: "Doc 9", project: "BPMN Annotations", schema: "BPMN Schema" },
        ],
      },
    },
  ]);

  return (
    <div className="dashboard p-6">
      <StatusFilter projects={projects} />
      <h1 className="text-2xl font-bold mt-6 mb-4">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
