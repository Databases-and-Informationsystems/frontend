import { Document } from '@/types/document';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DocumentStateType } from '@/types/document';
import { translateDocumentEditState } from '../util/document_util';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import UserIcon from '@/components/UserIcon';
import StartAnnotatingModal from './StartAnnotationModal';
import { useState } from 'react';
import { Link } from 'react-router';
import StyledLink from '@/components/StyledLink';

interface DocumentCardProps {
  document: Document;
  onDeleteDocument?: (id: number, type: DocumentStateType) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onDeleteDocument,
}: DocumentCardProps) => {
  const [isStartAnnotationModalOpen, setIsAnnotationModalOpen] =
    useState<boolean>(false);

  console.log('Document', document);
  return (
    <Card key={document.id}>
      <CardHeader className="relative">
        <CardTitle>{document.name}</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Document</DialogTitle>
              <DialogDescription>
                Delete document with its content.{' '}
                {document.document_edits.length
                  ? `This will delete the annotations of ${document.document_edits.length} user(s)`
                  : ''}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                {onDeleteDocument && (
                  <Button
                    variant="destructive"
                    type="submit"
                    onClick={() =>
                      onDeleteDocument(
                        document.id,
                        document.state.type as DocumentStateType
                      )
                    }
                  >
                    Delete
                  </Button>
                )}
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Popover>
          <PopoverTrigger asChild>
            <CardDescription className="cursor-pointer">
              {document.content.slice(0, 60)}{' '}
              {document.content.length > 60 ? '...' : ''}
            </CardDescription>
          </PopoverTrigger>
          <PopoverContent className="w-full max-w-5xl overflow-auto">
            {document.content}
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
        <span> Annotated by: </span>
        <div className="flex flex-wrap gap-2 mt-2">
          {document.document_edits.map((de) => (
            <div
              key={de.id}
              className="flex flex-col items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
            >
              <UserIcon user={de.user} />
              <span className="text-sm text-center text-gray-700 dark:text-gray-300">
                Step:
              </span>
              <strong className="text-sm text-center text-gray-700 dark:text-gray-300">
                {translateDocumentEditState(de.state.type)}{' '}
              </strong>
            </div>
          ))}
        </div>
        {document.document_edits.length > 1 && (
          <StyledLink to={`/dashboard/heatmap/${document.id}`}>
            Compare Annotations
          </StyledLink>
        )}
        <div className="flex flex-row-reverse mt-2">
          {document.document_edit?.id ? (
            <Button>
              <Link
                to={`/project/${document.project.id}/annotation/${document.document_edit?.id}?step=${document.document_edit?.state}`}
              >
                Continue
              </Link>
            </Button>
          ) : (
            <Button onClick={() => setIsAnnotationModalOpen(true)}>
              Start Annotation
            </Button>
          )}
        </div>
        <StartAnnotatingModal
          isOpen={isStartAnnotationModalOpen}
          setIsModalOpen={setIsAnnotationModalOpen}
          document={document}
        />
      </CardContent>
    </Card>
  );
};

export default DocumentCard;
