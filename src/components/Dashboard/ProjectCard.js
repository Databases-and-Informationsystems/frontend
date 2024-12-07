import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"; 
import "./ProjectCard.css"; 

const ProjectCard = ({ title, schema, team, documents }) => {
  const [showOngoing, setShowOngoing] = useState(false);
  const [showOpen, setShowOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleToggleOngoing = () => setShowOngoing(!showOngoing);
  const handleToggleOpen = () => setShowOpen(!showOpen);
  const handleToggleCompleted = () => setShowCompleted(!showCompleted);

  const totalDocuments =
    documents.ongoing.length + documents.open.length + documents.completed.length;

  return (
    <div className="project-card">
      <h3 className="project-title">{title}</h3>
      <p><strong>Schema:</strong> {schema}</p>
      <p><strong>Team:</strong> {team}</p>
      <p><strong>Total Documents:</strong> {totalDocuments}</p>

      <div className="status-section">
        <div className="status-card">
          <div className="status-item">
            <p className="status-title">Ongoing ({documents.ongoing.length})</p>
            <button onClick={handleToggleOngoing} className="toggle-button">
              <FontAwesomeIcon icon={faChevronDown} className="arrow-icon" /> 
            </button>
          </div>
          {showOngoing && (
            <div className="document-list show">
              {documents.ongoing.map((doc, index) => (
                <div key={index} className="document">
                  <p>{doc.name}</p>
                  <button className="action-button">Continue Working</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="status-card">
          <div className="status-item">
            <p className="status-title">Open ({documents.open.length})</p>
            <button onClick={handleToggleOpen} className="toggle-button">
              <FontAwesomeIcon icon={faChevronDown} className="arrow-icon" />
            </button>
          </div>
          {showOpen && (
            <div className="document-list show">
              {documents.open.map((doc, index) => (
                <div key={index} className="document">
                  <p>{doc.name}</p>
                  <button className="action-button">Start Working</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="status-card">
          <div className="status-item">
            <p className="status-title">Completed ({documents.completed.length})</p>
            <button onClick={handleToggleCompleted} className="toggle-button">
              <FontAwesomeIcon icon={faChevronDown} className="arrow-icon" />
            </button>
          </div>
          {showCompleted && (
            <div className="document-list show">
              {documents.completed.map((doc, index) => (
                <div key={index} className="document">
                  <p>{doc.name}</p>
                  <button className="action-button">Open Document</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button className="open-project-button">Open Project</button>
    </div>
  );
};

export default ProjectCard;
