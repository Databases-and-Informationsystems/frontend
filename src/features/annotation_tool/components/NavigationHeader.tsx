import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu.tsx'
import { useBlockStep } from '../hooks/useBlockStep';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { TriangleAlert } from 'lucide-react';
import { toast } from 'sonner';
import { useWorkflowContext } from '../context/useWorkflowContext';
import { workflowOrder, WorkflowStep } from '../types/workflow';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { DialogClose } from '@radix-ui/react-dialog';
import { useNavigate, useParams } from 'react-router';


const steps = [
  { key: 'MENTION_SUGGESTION', label: 'Mention Suggestion' },
  { key: 'MENTIONS', label: 'Mention Editing' },
  { key: 'ENTITIES', label: 'Entity Selection' },
  { key: 'RELATION_SUGGESTION', label: 'Relation Suggestion' },
  { key: 'RELATIONS', label: 'Relation Editing' },
];

interface NavigationHeaderProps {
  documentName: string;
}


export function NavigationHeader({ documentName }: NavigationHeaderProps) {
  const { currentStep, maxStep, error, updateStep, updateMaxStep } = useWorkflowContext();
  const isBlocked = useBlockStep(currentStep);

  const isForwardStep = (targetStep: string) => {
    const currentIndex = workflowOrder.indexOf(maxStep);
    const targetIndex = workflowOrder.indexOf(targetStep as WorkflowStep);
    return targetIndex > currentIndex;
  };

  const handleStepClick = async (key: string) => {
    if (isBlocked) {
      toast.warning('You have to finish all suggestions before you can proceed to the next step.', {
        className: 'text-base',
        icon: <TriangleAlert />,
      });
      return;
    }
    if (isForwardStep(key)) {
      const success = await updateMaxStep(key as WorkflowStep);
      if (!success) {
        toast.warning(error, {
          className: 'text-base',
          icon: <TriangleAlert />,
        });
        return;
      }
    }
    updateStep(key as WorkflowStep);
  };


  return (
    <div className="top-0">
      <h2 className="text-left text-3xl font-bold">Annotating: <span className="italic">{documentName}</span></h2>
      <div className="flex justify-between items-center py-4">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            {steps.map(({ key, label }, index) => (
              <React.Fragment key={key}>
                <NavigationMenuItem className='border-2 rounded-lg p-2 select-none'>
                  <NavigationMenuLink
                    onClick={() => key !== currentStep && handleStepClick(key)}
                    style={{ cursor: 'pointer' }}
                    className={`text-lg font-medium ${key === currentStep ? 'text-blue-500' : 'text-gray-500'
                      }`}
                  >
                    {label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {index < steps.length - 1 && <Separator className='w-8' />}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            <NavigationMenuItem>
              <NavigationMenuLink style={{ cursor: "pointer" }} className="text-lg font-medium">
                <ConfirmExitDialog input='Save and Exit' />
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink style={{ cursor: "pointer" }} className="text-lg font-medium">
                <ConfirmExitDialog input='Finish Annotation' />
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}

interface ConfirmExitDialogProps {
  input: string;
}

const ConfirmExitDialog = ({ input }: ConfirmExitDialogProps) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className='text-lg font-medium'>{input}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Exit Annotation</DialogTitle>
          <DialogDescription>
            Are you sure you want to exit the annotation?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={() => navigate(`/dashboard/projects-v2/${projectId}`)} variant="destructive">
            Yes, Exit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}