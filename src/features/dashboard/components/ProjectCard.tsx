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

  return (
    <div className="project-card bg-white p-8 rounded-lg shadow-lg">
      <h3>{title}</h3>
      <p>Schema: {schema}</p>
      <p>Team: {team}</p>
      <p>Total Documents: {documents.ongoing.length + documents.open.length + documents.completed.length}</p>
      {/* Status sections */}
      {/* Ongoing */}
      <div>
        <button onClick={() => setShowOngoing(!showOngoing)}>
          Ongoing ({documents.ongoing.length}){" "}
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        {showOngoing && (
          <div>
            {documents.ongoing.map((doc, index) => (
              <div key={index}>
                <p>{doc.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Open */}
      <div>
        <button onClick={() => setShowOpen(!showOpen)}>
          Open ({documents.open.length}){" "}
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        {showOpen && (
          <div>
            {documents.open.map((doc, index) => (
              <div key={index}>
                <p>{doc.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Completed */}
      <div>
        <button onClick={() => setShowCompleted(!showCompleted)}>
          Completed ({documents.completed.length}){" "}
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        {showCompleted && (
          <div>
            {documents.completed.map((doc, index) => (
              <div key={index}>
                <p>{doc.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
