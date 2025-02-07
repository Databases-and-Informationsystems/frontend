import { ModeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { SelectionProvider } from '../provider/SelectionProvider';
import { MentionProvider } from '../provider/MentionProvider';
import { AnnotationControlBox } from './AnnotationControlBox';
import { RelationProvider } from '../provider/RelationProvider';
import { MentionStep } from '../pages/MentionStep';
import { RelationStep } from '../pages/RelationStep';
import { TokenProvider } from '../provider/TokenProvider';
import { SchemaProvider } from '../provider/SchemaProvider';
import { MentionSuggestionStep } from '../pages/MentionSuggestionStep';
import { RelationSuggestionStep } from '../pages/RelationSuggestionStep';
import { NavigationHeader } from './NavigationHeader';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { DocumentEdit } from '../types/documentEdit';
import { fetchDocumentEdit } from '../api/documentEdit';
import { useWorkflowContext } from '../context/useWorkflowContext';
import { WorkflowStep } from '../types/workflow';
import { WorkflowProvider } from '../provider/WorkflowProvider';

export const AnnotationLayout = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [annotationData, setAnnotationData] = useState<DocumentEdit>();

  useEffect(() => {
    if (!id) {
      setError('Document edit id is missing');
      setLoading(false);
      return;
    }

    const fetchAnnotationData = async () => {
      try {
        const data = await fetchDocumentEdit(Number(id));
        console.log('Annotation Data', data);
        setAnnotationData(data);
      } catch (err) {
        setError('Failed to fetch annotation data: ' + err);
      }
      finally {
        setLoading(false);
      }
    };

    fetchAnnotationData();
  }, [id]);

  if (loading) {
    return <div>Loading Document Details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!annotationData) {
    return <div>No data found</div>;
  }


  return (
    <WorkflowProvider initialStep={annotationData.state.type as WorkflowStep}>
      <TokenProvider documentId={annotationData.document.id}>
        <SchemaProvider schemaId={annotationData.schema_id}>
          <MentionProvider initialMentions={annotationData.mentions}>
            <SelectionProvider>
              <RelationProvider initialRelations={annotationData.relations} documentEditId={Number(id)}>
                <div className='p-6'>
                  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Annotation Document
                  </h1>
                  <NavigationHeader documentName={annotationData.document.name} />
                  <AnnotationControlBox />
                  <CurrentStepRender />
                  <ModeToggle />
                </div>
              </RelationProvider>
            </SelectionProvider>
          </MentionProvider>
        </SchemaProvider>
      </TokenProvider>
    </WorkflowProvider>
  )
}

const CurrentStepRender = () => {
  const { currentStep } = useWorkflowContext();
  switch (currentStep) {
    case 'MENTION_SUGGESTION':
      return <MentionSuggestionStep />
    case 'MENTIONS':
      return <MentionStep />
    case 'ENTITIES':
      return <div>Entity Selection</div>
    case 'RELATION_SUGGESTION':
      return <RelationSuggestionStep />
    case 'RELATIONS':
      return <RelationStep />
  }
}
