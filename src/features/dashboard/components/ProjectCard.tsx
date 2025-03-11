import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { Document, DocumentStateType } from '@/types/document';
import { Project } from '@/types/project';

import { Button } from '@/components/ui/button.tsx';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion.tsx';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
}: ProjectCardProps) => {
  const navigate = useNavigate();

  const documentsByState = useMemo(() => {
    const ret: { [status: string]: Document[] } = {};
    project.documents?.forEach((doc) => {
      if (!(doc.state.type in ret)) {
        ret[doc.state.type] = [];
      }
      ret[doc.state.type].push(doc);
    });
    return ret;
  }, [project]);

  const renderDocument = (doc: Document) => {
    return (
      <div key={doc.id} className={'flex'}>
        <div className={'flex-none'}>{doc.name}</div>
        <div className={'flex-none items-end'}>
          <Button
            variant={'ghost'}
            onClick={() =>
              navigate(`/project/${doc.project.id}/annotation/${doc.id}`)
            }
          >
            Open
          </Button>
        </div>
      </div>
    );
  };

  const renderState = (state: DocumentStateType) => {
    switch (state) {
      case DocumentStateType.NEW:
        return (
          <>
            <FontAwesomeIcon icon={'file'} /> New
          </>
        );
      case DocumentStateType.IN_PROGRESS:
        return (
          <>
            <FontAwesomeIcon icon={'file-pen'} /> In Progress
          </>
        );
      case DocumentStateType.FINISHED:
        return (
          <>
            <FontAwesomeIcon icon={'file-check'} /> Completed
          </>
        );
      default:
        return (
          <>
            <FontAwesomeIcon icon={'question-circle'} />
            {state}
          </>
        );
    }
  };

  const renderDocumentsByStatus = (
    state: DocumentStateType,
    documents: { [state: string]: Document[] }
  ) => {
    const relevantDocuments = documents[state];
    return (
      <AccordionItem value={state}>
        <AccordionTrigger>
          {renderState(state)}(
          {relevantDocuments ? relevantDocuments.length : 0})
        </AccordionTrigger>
        <AccordionContent>
          {relevantDocuments
            ? relevantDocuments.map(renderDocument)
            : 'No documents'}
        </AccordionContent>
      </AccordionItem>
    );
  };

  return (
    <Card>
      <CardHeader>{project.name}</CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {renderDocumentsByStatus(DocumentStateType.NEW, documentsByState)}
          {renderDocumentsByStatus(
            DocumentStateType.IN_PROGRESS,
            documentsByState
          )}
          {renderDocumentsByStatus(
            DocumentStateType.FINISHED,
            documentsByState
          )}
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => navigate(`/dashboard/projects-v2/${project.id}`)}
        >
          Open Project
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
