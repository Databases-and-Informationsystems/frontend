import React from "react";
import "./StatusFilter.css";

const StatusFilter = ({ projects = [] }) => {
  
  const ongoingDocs = projects.flatMap((project) =>
    project.documents.ongoing.map((doc) => ({
      ...doc,
      project: project.title,
      schema: project.schema,
      status: "Ongoing",
      progress: project.progress 
    }))
  );

  const openDocs = projects.flatMap((project) =>
    project.documents.open.map((doc) => ({
      ...doc,
      project: project.title,
      schema: project.schema,
      status: "Open",
    }))
  );

  return (
    <div className="status-filter">
      {}
      <div className="filter-section">
        <h2 className="filter-title">Ongoing Documents</h2>
        <div className="filter-cards">
          {ongoingDocs.map((doc, index) => (
            <div key={index} className="filter-card">
              <p className="filter-card-title">Document: {doc.name}</p>
              <p className="filter-card-content">Project: {doc.project}</p>
              <p className="filter-card-content">Schema: {doc.schema}</p>

              {}
              <div className="annotation-progress">
                <p><strong>Annotation Progress:</strong></p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${doc.progress}%` }}></div>
                </div>
                <p>{doc.progress}% Completed</p>
              </div>

              <button className="filter-card-button">Continue Working</button>
            </div>
          ))}
        </div>
      </div>

      {}
      <div className="filter-section">
        <h2 className="filter-title">Open Documents</h2>
        <div className="filter-cards">
          {openDocs.map((doc, index) => (
            <div key={index} className="filter-card">
              <p className="filter-card-title">Document: {doc.name}</p>
              <p className="filter-card-content">Project: {doc.project}</p>
              <p className="filter-card-content">Schema: {doc.schema}</p>

              <button className="filter-card-button">Start Working</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusFilter;
