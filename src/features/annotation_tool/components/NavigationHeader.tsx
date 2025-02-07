import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu.tsx'
import { useStepNavigation } from '../hooks/useStepNavigation'
import { useBlockStep } from '../hooks/useBlockStep';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { CircleCheckBig, Save, TriangleAlert } from 'lucide-react';
import { toast } from 'sonner';

const steps = [
  { key: 'MENTION_SUGGESTION', label: 'Mention Suggestion' },
  { key: 'MENTIONS', label: 'Mention Editing' },
  { key: 'ENTITIES', label: 'Entity Selection' },
  { key: 'RELATION_SUGGESTION', label: 'Relation Suggestion' },
  { key: 'RELATIONS', label: 'Relation Editing' },
];

interface NavigationHeaderProps {
  documentName: string;
  currentStep: string;
}


export function NavigationHeader({ documentName, currentStep }: NavigationHeaderProps) {
  const { step, handleStepChange } = useStepNavigation(currentStep);

  const isBlocked = useBlockStep(step);

  const handleStepClick = (key: string) => {
    if (isBlocked) {
      toast.warning('You have to finish all suggestions, before you can proceed to the next step.',
        {
          className: 'text-base',
          icon: <TriangleAlert />,
        }
      );
      return;
    }
    handleStepChange(key);
  }


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
                    onClick={() => key !== step && handleStepClick(key)}
                    style={{ cursor: 'pointer' }}
                    className={`text-lg font-medium ${key === step ? 'text-blue-500' : 'text-gray-500'
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
              <NavigationMenuLink onClick={() => {/*TODO*/ }} style={{ cursor: "pointer" }} className="text-lg font-medium">
                <div className='flex border-2 rounded-lg p-2 gap-2'>
                  <Save />
                  Save Changes
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink onClick={() => {/*TODO*/ }} style={{ cursor: "pointer" }} className="text-lg font-medium">
                <div className='flex border-2 rounded-lg p-2 gap-2'>
                  <CircleCheckBig />
                  Finish Annotation
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}