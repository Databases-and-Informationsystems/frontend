import React from 'react';
import UIButton from './UIButton';

interface Document {
  id: number;
  name: string;
  content: string;
  progress: number;
}

interface DocumentListProps {
  ongoingDocs: Document[];
  openDocs: Document[];
  completedDocs: Document[];
  handlePreviewDocument: (content: string) => void;
  handleDeleteDocument: (id: number) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  ongoingDocs,
  openDocs,
  completedDocs,
  handlePreviewDocument,
  handleDeleteDocument,
}) => {
  return (
    <div className="space-y-6">
      {/* Ongoing Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Ongoing ({ongoingDocs.length})</h2>
        <div className="space-y-4">
          {ongoingDocs.map((doc) => (
            <div key={doc.id} className="flex justify-between items-center border p-4 rounded-lg shadow-sm">
              <div>
                <p className="font-semibold">{doc.name}</p>
                <div className="bg-gray-200 h-2 rounded-full mt-2 w-full">
                  <div className="bg-blue-500 h-full" style={{ width: `${doc.progress}%` }}></div>
                </div>
                <div className="text-sm text-gray-600">{doc.progress}% Annotated</div>
              </div>
              <UIButton label="Continue" onClick={() => console.log(`Continue ${doc.name}`)} />
            </div>
          ))}
        </div>
      </div>

      {/* Open Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Open ({openDocs.length})</h2>
        <div className="space-y-4">
          {openDocs.map((doc) => (
            <div key={doc.id} className="flex justify-between items-center border p-4 rounded-lg shadow-sm">
              <p className="font-semibold">{doc.name}</p>
              <div className="flex gap-4">
                <UIButton label="Preview" onClick={() => handlePreviewDocument(doc.content)} />
                <button className="text-red-500 font-bold" onClick={() => handleDeleteDocument(doc.id)}>🗑</button>
                <UIButton label="Start Working" onClick={() => console.log(`Start Working ${doc.name}`)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Completed ({completedDocs.length})</h2>
        <div className="space-y-4">
          {completedDocs.map((doc) => (
            <div key={doc.id} className="flex justify-between items-center border p-4 rounded-lg shadow-sm">
              <p className="font-semibold">{doc.name}</p>
              <UIButton label="View" onClick={() => console.log(`View ${doc.name}`)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentList;
