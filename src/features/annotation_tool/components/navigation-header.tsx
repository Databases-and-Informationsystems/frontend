import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu.tsx'


export function NavigationHeader(props: {project_name: string}) {
  return (
    <div className="top-0">
      <h2 className="text-left text-3xl font-bold">Annotating: <span className="italic">{props.project_name}</span></h2>
      <div className="flex space-x-4">
        <NavigationMenu>
          <div className="flex space-x-4">
            <NavigationMenuItem>
              <NavigationMenuLink href="/m_sug" className="text-lg font-medium">
                Mention suggestion
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/m_edt" className="text-lg font-medium">
                Mention editing
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/e_sel" className="text-lg font-medium">
                Entity selection
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/r_sug" className="text-lg font-medium">
                Relation suggestion
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/r_edt" className="text-lg font-medium">
                Relation editing
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>
        </NavigationMenu>
      </div>
      <NavigationMenu>
        <NavigationMenuItem>
          <NavigationMenuLink onClick={() => {/*TODO*/}} className="text-lg font-medium">
            u
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink onClick={() => {/*TODO*/}} className="text-lg font-medium">
            f
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink onClick={() => {/*TODO*/}} className="text-lg font-medium">
            save
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  )
}