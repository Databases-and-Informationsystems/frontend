import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router'; 
import { STATUS_STYLES } from "../types/types";
import { Project } from "../types/types";

interface ProjectCardProps {
  Project: Project;
  team: string;
}


const ProjectCard: React.FC<ProjectCardProps> =({ Project, team }) => {
  const [showOngoing, setShowOngoing] = useState(false);
  const [showOpen, setShowOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const navigate = useNavigate();
   
  const handleOpenProject = () => {
    navigate('/projects');
  };

  return (
    <div className="project-card bg-white p-8 rounded-lg shadow-lg w-full">
      <h3 className="text-2xl font-bold">{Project.title}</h3>
      <p className="text-sm text-gray-600">Schema: {Project.schema.name}</p>
      <p className="text-sm text-gray-600">Team: {team}</p>
      <p className="text-sm text-gray-800 font-medium">
        Total Documents: {Project.documents.ongoing.length + Project.documents.open.length + Project.documents.completed.length}
      </p>
      <div className="mt-4">
        <button
          className="w-full flex items-center justify-between bg-gray-100 py-2 px-4 rounded-lg text-left hover:bg-gray-200"
          onClick={() => setShowOngoing(!showOngoing)}
        >
          <span className={`font-semibold ${STATUS_STYLES.Ongoing}`}>
            Ongoing ({Project.documents.ongoing.length})
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`transition-transform duration-200 ${showOngoing ? "rotate-180" : ""}`}
          />
        </button>
        {showOngoing && (
          <div className="mt-2">
            {Project.documents.ongoing.map((doc, index) => (
              <div key={index} className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm w-full mb-4">
                <p className="font-semibold">{doc.name}</p>
                <p className="text-sm text-gray-600">Project: {doc.project.title}</p>
                <p className="text-sm text-gray-600">Schema: {doc.schema.name}</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Continue Working
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4">
        <button
          className="w-full flex items-center justify-between bg-gray-100 py-2 px-4 rounded-lg text-left hover:bg-gray-200"
          onClick={() => setShowOpen(!showOpen)}
        >
          <span className={`font-semibold ${STATUS_STYLES.Open}`}>
            Open ({Project.documents.open.length})
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`transition-transform duration-200 ${showOpen ? "rotate-180" : ""}`}
          />
        </button>
        {showOpen && (
          <div className="mt-2">
            {Project.documents.open.map((doc, index) => (
              <div key={index} className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm w-full mb-4">
                <p className="font-semibold">{doc.name}</p>
                <p className="text-sm text-gray-600">Project: {doc.project.title}</p>
                <p className="text-sm text-gray-600">Schema: {doc.schema.name}</p>
                <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                  Start Working
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4">
        <button
          className="w-full flex items-center justify-between bg-gray-100 py-2 px-4 rounded-lg text-left hover:bg-gray-200"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          <span className={`font-semibold ${STATUS_STYLES.Completed}`}>
            Completed ({Project.documents.completed.length})
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`transition-transform duration-200 ${showCompleted ? "rotate-180" : ""}`}
          />
        </button>
        {showCompleted && (
          <div className="mt-2">
            {Project.documents.completed.map((doc, index) => (
              <div key={index} className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm w-full mb-4">
                <p className="font-semibold">{doc.name}</p>
                <p className="text-sm text-gray-600">Project: {doc.project.title}</p>
                <p className="text-sm text-gray-600">Schema: {doc.schema.name}</p>
                <button className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700">
                  Open Document
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4">
        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
         onClick={handleOpenProject} >
          Open Project
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
