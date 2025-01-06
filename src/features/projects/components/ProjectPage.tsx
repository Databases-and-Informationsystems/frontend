import React, { useState } from 'react';
import Modal from './Modal';
import DocumentForm from './DocumentForm';
import ProjectCard from './ProjectCard';
import DocumentPreview from './DocumentPreview';
import DocumentList from './DocumentList';

interface Document {
  id: number;
  name: string;
  content: string;
  progress: number;
  project: string;
  schema: string;
}

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Project A', schema: 'Schema A', team: 'Team Alpha' },
    { id: 2, title: 'Project B', schema: 'Schema B', team: 'Team Beta' },
  ]);

  const [ongoingDocs, setOngoingDocs] = useState<Document[]>([
    { id: 1, name: 'Ongoing Doc 1', content: 'Content 1', progress: 50, project: 'Project A', schema: 'Schema A' },
  ]);

  const [openDocs, setOpenDocs] = useState<Document[]>([
    { id: 2, name: 'Open Doc 1', content: 'Content 2', progress: 0, project: 'Project A', schema: 'Schema A' },
  ]);

  const [completedDocs, setCompletedDocs] = useState<Document[]>([
    { id: 3, name: 'Completed Doc 1', content: 'Content 3', progress: 100, project: 'Project A', schema: 'Schema A' },
  ]);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isAddDocOpen, setIsAddDocOpen] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  
  const [projectName, setProjectName] = useState('');
  const [schema, setSchema] = useState('');
  const [team, setTeam] = useState('');
  const [teams] = useState(['Team Alpha', 'Team Beta']);
  const [schemas] = useState(['Schema A', 'Schema B']);

  const handleAddDocument = (name: string, content: string,project:string) => {
    const newDocument: Document = {
      id: Date.now(),
      name,
      content,
      progress: 0,
      project,
      schema,
    };
    setOpenDocs((prev) => [...prev, newDocument]);
  };

  const handleDeleteDocument = (id: number) => {
    setOngoingDocs((prev) => prev.filter((doc) => doc.id !== id));
    setOpenDocs((prev) => prev.filter((doc) => doc.id !== id));
    setCompletedDocs((prev) => prev.filter((doc) => doc.id !== id));
    console.log(`Document with id ${id} deleted`);
  };

const handlePreviewDocument = (content: string) => {
    if (content) {
        setPreviewContent(content);
    } else {
        setPreviewContent("No content available for preview.");
    }
  };

  const handleOpenProject = () => setIsDetailsVisible(true);
  const handleCloseProject = () => setIsDetailsVisible(false);
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      {!isDetailsVisible && (
        <>
          <button
            className="fixed top-6 right-6 bg-[#0097E1] text-white py-2 px-4 rounded-lg hover:bg-[#4ab9f0]"
            onClick={() => setIsProjectModalOpen(true)}
          >
            Create Project
          </button>

          <h1 className="text-3xl font-bold mb-6">Projects</h1>

          <div className="space-y-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                schema={project.schema}
                team={project.team}
                documents={{
                  ongoing: ongoingDocs.filter((doc) => doc.project === project.title),
                  open: openDocs.filter((doc) => doc.project === project.title),
                  completed: completedDocs.filter((doc) => doc.project === project.title),
                }}
                onPreview={handlePreviewDocument} // Ensure onPreview is included
                onDeleteDocument={handleDeleteDocument}
                onAddDocument={() => setIsAddDocOpen(true)}
                onOpenProject={handleOpenProject}
                onCloseProject={handleCloseProject} // Add this line
              />
            ))}
          </div>
        </>
      )}

      {isDetailsVisible && (
        <div className="modal bg-white p-6 rounded-lg shadow-lg relative">
          <button
            className="absolute top-2 right-2 bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
            onClick={handleCloseProject}
          >
            Close
          </button>
          <DocumentList
            ongoingDocs={ongoingDocs}
            openDocs={openDocs}
            completedDocs={completedDocs}
            handlePreviewDocument={handlePreviewDocument}
            handleDeleteDocument={handleDeleteDocument}
          />
          <button
            className="bg-[#0097E1] text-white py-2 px-4 rounded-lg hover:bg-[#4ab9f0] mt-4"
            onClick={() => setIsAddDocOpen(true)}
          >
            Add Document
          </button>
        </div>
      )}

      {previewContent && (
        <DocumentPreview onClose={() => setPreviewContent(null)} /> // Remove 'content' prop
      )}

      {isAddDocOpen && (
        <DocumentForm
          onClose={() => setIsAddDocOpen(false)}
          onCreate={handleAddDocument}
          projects={projects.map((project) => project.title)} // Passez la liste des titres de projets
        />
      )}
      

      {isProjectModalOpen && (
        <Modal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          onCreate={(name, schema, team) => {
            setProjects((prev) => [...prev, { id: Date.now(), title: name, schema, team }]);
            setIsProjectModalOpen(false);
          }}
          projectName={projectName}
          setProjectName={setProjectName}
          schema={schema}
          setSchema={setSchema}
          team={team}
          setTeam={setTeam}
          teams={teams}
          schemas={schemas}
        />
      )}
    </div>
  );
};

export default ProjectPage;