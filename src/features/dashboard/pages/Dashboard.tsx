import React, { useEffect, useState } from 'react';

import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../api/dashboard';
import { Document, DocumentEditStateType } from '@/types/document';
import { Project } from '@/types/project';
import { useAuth } from '@/app/hooks/useAuth.ts';
import DocumentCard from '@/features/projects/components/DocumentCard.tsx';
import { getDocumentsByProject } from '@/features/projects/api/projects.ts';

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { email } = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        let projectsData = await getProjects();
        const docsPromises = projectsData.map((p) =>
          getDocumentsByProject(p.id)
        );
        const docsByProject = await Promise.all(docsPromises);
        projectsData = projectsData.map((p, i) => {
          return {
            ...p,
            documents: docsByProject[i],
          };
        });
        setProjects(projectsData);
        setDocuments(docsByProject.flat());
      } catch (error) {
        console.error('Data not found', error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const continueDocuments = React.useMemo(() => {
    return documents.filter((doc) => {
      console.log(doc.document_edits);
      const ownEdits = doc.document_edits.filter((e) => e.user.email === email);
      console.log(ownEdits);
      const inProgressEdits = ownEdits.filter(
        (e) => e.state.type !== DocumentEditStateType.FINISHED
      );
      console.log(inProgressEdits);
      return inProgressEdits.length > 0;
    });
  }, [email, documents]);

  console.log(documents);
  console.log(continueDocuments);

  if (loading) {
    return <div> Loading project ...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mt-6 mb-4">
        Continue where you left off
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {continueDocuments.slice(0, 5).map((d) => (
          <DocumentCard document={d} />
        ))}
      </div>
      <h1 className="text-2xl font-bold mt-6 mb-4">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
