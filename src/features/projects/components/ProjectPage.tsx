import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import DocumentForm from './DocumentForm';
import ProjectCard from './ProjectCard';
import DocumentPreview from './DocumentPreview';
import DocumentList from './DocumentList';
import {
  getProjects,
  createProject,
  //getDocumentsByProject,
  createDocument,
  deleteDocument,
  getTeams,
  getSchemas,
} from '../api/api';

interface Document {
  id: number;
  name: string;
  content: string;
  progress: number;
  project: string;
  schema: string;
}

interface Project {
  id: number;
  title: string;
  schema: string;
  team: string;
}

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [ongoingDocs, setOngoingDocs] = useState<Document[]>([]);
  const [openDocs, setOpenDocs] = useState<Document[]>([]);
  const [completedDocs, setCompletedDocs] = useState<Document[]>([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isAddDocOpen, setIsAddDocOpen] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [projectName, setProjectName] = useState('');
  const [schema, setSchema] = useState('');
  const [team, setTeam] = useState('');
  const [teams, setTeams] = useState<string[]>([]);
  const [schemas, setSchemas] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, teamsData, schemasData] = await Promise.all([
          getProjects(),
          getTeams(),
          getSchemas(),
        ]);
        setProjects(projectsData);
        setTeams(teamsData.map((team: { name: string }) => team.name));
        setSchemas(schemasData.map((schema: { name: string }) => schema.name));
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchData();
  }, []);



  const handleAddDocument = async (name: string, content: string, project: string) => {
    try {
      const projectId = projects.find((p) => p.title === project)?.id;
      if (!projectId) throw new Error('Project not found');

      const newDoc = await createDocument(projectId, name, content);
      setOpenDocs((prev) => [...prev, newDoc]);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const handleDeleteDocument = async (id: number) => {
    try {
      await deleteDocument(id);
      setOngoingDocs((prev) => prev.filter((doc) => doc.id !== id));
      setOpenDocs((prev) => prev.filter((doc) => doc.id !== id));
      setCompletedDocs((prev) => prev.filter((doc) => doc.id !== id));
      console.log(`Document with id ${id} deleted`);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handlePreviewDocument = (content: string) => {
    setPreviewContent(content || 'No content available for preview.');
  };

  const handleOpenProject = () => setIsDetailsVisible(true);
  const handleCloseProject = () => setIsDetailsVisible(false);

  const handleCreateProject = async (name: string, schemaName: string, teamName: string) => {
    try {
      const schemaId = schemas.find((s) => s === schemaName);
      const teamId = teams.find((t) => t === teamName);
      if (typeof schemaId === 'string') throw new Error('Schema ID is invalid.');
      if (typeof teamId === 'string') throw new Error('Team ID is invalid.');
      if (!schemaId || !teamId) throw new Error('Schema or team not found');

      const newProject = await createProject(name, teamId, schemaId);
      setProjects((prev) => [...prev, newProject]);
      setIsProjectModalOpen(false);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

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
                onPreview={handlePreviewDocument}
                onDeleteDocument={handleDeleteDocument}
                onAddDocument={() => setIsAddDocOpen(true)}
                onOpenProject={handleOpenProject}
              />
            ))}
          </div>
        </>
      )}

      {isDetailsVisible && (
        <div className="modal bg-white p-6 rounded-lg shadow-lg relative z-40">
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
        <DocumentPreview onClose={() => setPreviewContent(null)} />
      )}

      {isAddDocOpen && (
        <div className="relative z-50">
          <DocumentForm
            onClose={() => setIsAddDocOpen(false)}
            onCreate={handleAddDocument}
            projects={projects.map((project) => project.title)}
          />
        </div>
      )}

      {isProjectModalOpen && (
        <Modal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          onCreate={handleCreateProject}
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
