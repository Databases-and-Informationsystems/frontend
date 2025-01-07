import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu.tsx'
import { useStepNavigation } from '../hooks/useStepNavigation'
import { useBlockStep } from '../hooks/useBlockStep';

const steps = [
  { key: 'mentionSuggestion', label: 'Mention Suggestion' },
  { key: 'mentionEditing', label: 'Mention Editing' },
  { key: 'entitySelection', label: 'Entity Selection' },
  { key: 'relationSuggestion', label: 'Relation Suggestion' },
  { key: 'relationEditing', label: 'Relation Editing' },
];


export function NavigationHeader(props: { project_name: string }) {
  const { step, handleStepChange } = useStepNavigation();

  const isBlocked = useBlockStep(step);

  const handleStepClick = (key: string) => {
    if (isBlocked) {
      alert("You cannot navigate away until all suggestions are completed.");
      return;
    }
    handleStepChange(key);
  }


  return (
    <div className="top-0">
      <h2 className="text-left text-3xl font-bold">Annotating: <span className="italic">{props.project_name}</span></h2>
      <div className="flex space-x-4">
        <NavigationMenu>
          <NavigationMenuList>
            {steps.map(({ key, label }) => (
              <NavigationMenuItem key={key}>
                <NavigationMenuLink
                  onClick={() => handleStepClick(key)}
                  style={{ cursor: 'pointer' }}
                  className={`text-lg font-medium ${key === step ? 'text-blue-500' : 'text-gray-500'
                    }`}
                >
                  {label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <NavigationMenu>
        <div className="flex space-x-4">
          <NavigationMenuItem>
            <NavigationMenuLink onClick={() => {/*TODO*/ }} style={{ cursor: "pointer" }} className="text-lg font-medium">
              u
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink onClick={() => {/*TODO*/ }} style={{ cursor: "pointer" }} className="text-lg font-medium">
              f
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink onClick={() => {/*TODO*/ }} style={{ cursor: "pointer" }} className="text-lg font-medium">
              save
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink onClick={() => {/*TODO*/ }} style={{ cursor: "pointer" }} className="text-lg font-medium">
              download
            </NavigationMenuLink>
          </NavigationMenuItem>
          {/* <SplitOptions></SplitOptions> */}
        </div>
      </NavigationMenu>
    </div>
  )
}