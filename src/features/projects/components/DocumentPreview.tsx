import React from 'react';

export interface DocumentPreviewProps { 
  onClose: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
    }}>
      <h2>Document Preview</h2>
      <p>This is a preview of the document.</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DocumentPreview;