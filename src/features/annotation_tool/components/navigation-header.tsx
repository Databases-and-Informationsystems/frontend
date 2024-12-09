import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu.tsx'
import { useEffect, useState } from 'react'
import { AnnotationStates } from '@/features/annotation_tool/components/annotation-states.tsx'


export function NavigationHeader(props: {project_name: string}) {

  const [currentState, setCurrentState] = useState(AnnotationStates.NotStarted);
  const [changeToState, setChangeToState] = useState(AnnotationStates.NoChange);

  useEffect(() => {
    if (changeToState !== AnnotationStates.NoChange) {
      //logic to change save and set the currentState
      setCurrentState(changeToState); //debug mode :)
      setChangeToState(AnnotationStates.NoChange);
    }
  })

  function SplitOptions() {
    if (currentState === AnnotationStates.RelationEditing) {
      return (
        <>
          <NavigationMenuItem>
            <NavigationMenuLink onClick={() => {/*TODO*/}} style={{cursor: "pointer"}} className="text-lg font-medium">
              split view
            </NavigationMenuLink>
          </NavigationMenuItem>
        </>
      )
    }
  }

  return (
    <div className="top-0">
      <h2 className="text-left text-3xl font-bold">Annotating: <span className="italic">{props.project_name}</span></h2>
      <div className="flex space-x-4">
        <NavigationMenu>
          <div className="flex space-x-4">
            <NavigationMenuItem>
              <NavigationMenuLink onClick={() => setChangeToState(AnnotationStates.MentionSuggestion)} style={{cursor: "pointer"}} className="text-lg font-medium">
                Mention suggestion
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink onClick={() => setChangeToState(AnnotationStates.MentionEditing)} style={{cursor: "pointer"}} className="text-lg font-medium">
                Mention editing
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink onClick={() => setChangeToState(AnnotationStates.EntitySelection)} style={{cursor: "pointer"}} className="text-lg font-medium">
                Entity selection
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink onClick={() => setChangeToState(AnnotationStates.RelationSuggestion)} style={{cursor: "pointer"}} className="text-lg font-medium">
                Relation suggestion
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink onClick={() => setChangeToState(AnnotationStates.RelationEditing)} style={{cursor: "pointer"}} className="text-lg font-medium">
                Relation editing
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>
        </NavigationMenu>
      </div>
      <NavigationMenu>
        <div className="flex space-x-4">
          <NavigationMenuItem>
            <NavigationMenuLink onClick={() => {/*TODO*/}} style={{cursor: "pointer"}} className="text-lg font-medium">
              u
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink onClick={() => {/*TODO*/}} style={{cursor: "pointer"}} className="text-lg font-medium">
              f
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink onClick={() => {/*TODO*/}} style={{cursor: "pointer"}} className="text-lg font-medium">
              save
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink onClick={() => {/*TODO*/}} style={{cursor: "pointer"}} className="text-lg font-medium">
              download
            </NavigationMenuLink>
          </NavigationMenuItem>
          <SplitOptions></SplitOptions>
        </div>
      </NavigationMenu>
    </div>
  )
}