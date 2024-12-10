import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface Document {
  name: string;
  project: string;
  schema: string;
}

interface ProjectCardProps {
  title: string;
  schema: string;
  team: string;
  documents: {
    ongoing: Document[];
    open: Document[];
    completed: Document[];
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  schema,
  team,
  documents,
}) => {
  const [showOngoing, setShowOngoing] = useState(false);
  const [showOpen, setShowOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ongoing":
        return "text-green-600";
      case "Open":
        return "text-blue-600";
      case "Completed":
        return "text-gray-600";
      default:
        return "text-black";
    }
  };

  return (
    <div className="project-card bg-white p-8 rounded-lg shadow-lg w-full">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-sm text-gray-600">Schema: {schema}</p>
      <p className="text-sm text-gray-600">Team: {team}</p>
      <p className="text-sm text-gray-800 font-medium">
        Total Documents: {documents.ongoing.length + documents.open.length + documents.completed.length}
      </p>

      {/* Ongoing */}
      <div className="mt-4">
        <button
          className="w-full flex items-center justify-between bg-gray-100 py-2 px-4 rounded-lg text-left hover:bg-gray-200"
          onClick={() => setShowOngoing(!showOngoing)}
        >
          <span className={`font-semibold ${getStatusColor("Ongoing")}`}>
            Ongoing ({documents.ongoing.length})
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`transition-transform duration-200 ${showOngoing ? "rotate-180" : ""}`}
          />
        </button>
        {showOngoing && (
          <div className="mt-2">
            {documents.ongoing.map((doc, index) => (
              <div key={index} className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm w-full mb-4">
                <p className="font-semibold">{doc.name}</p>
                <p className="text-sm text-gray-600">Project: {doc.project}</p>
                <p className="text-sm text-gray-600">Schema: {doc.schema}</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Continue Working
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Open */}
      <div className="mt-4">
        <button
          className="w-full flex items-center justify-between bg-gray-100 py-2 px-4 rounded-lg text-left hover:bg-gray-200"
          onClick={() => setShowOpen(!showOpen)}
        >
          <span className={`font-semibold ${getStatusColor("Open")}`}>
            Open ({documents.open.length})
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`transition-transform duration-200 ${showOpen ? "rotate-180" : ""}`}
          />
        </button>
        {showOpen && (
          <div className="mt-2">
            {documents.open.map((doc, index) => (
              <div key={index} className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm w-full mb-4">
                <p className="font-semibold">{doc.name}</p>
                <p className="text-sm text-gray-600">Project: {doc.project}</p>
                <p className="text-sm text-gray-600">Schema: {doc.schema}</p>
                <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                  Start Working
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed */}
      <div className="mt-4">
        <button
          className="w-full flex items-center justify-between bg-gray-100 py-2 px-4 rounded-lg text-left hover:bg-gray-200"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          <span className={`font-semibold ${getStatusColor("Completed")}`}>
            Completed ({documents.completed.length})
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`transition-transform duration-200 ${showCompleted ? "rotate-180" : ""}`}
          />
        </button>
        {showCompleted && (
          <div className="mt-2">
            {documents.completed.map((doc, index) => (
              <div key={index} className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm w-full mb-4">
                <p className="font-semibold">{doc.name}</p>
                <p className="text-sm text-gray-600">Project: {doc.project}</p>
                <p className="text-sm text-gray-600">Schema: {doc.schema}</p>
                <button className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700">
                  Open Document
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bouton Open Project */}
      <div className="mt-4">
        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
          Open Project
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
