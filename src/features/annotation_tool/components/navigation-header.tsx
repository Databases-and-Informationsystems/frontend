import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu.tsx'


export function NavigationHeader(props: {project_name: string}) {
  return (
    <div className="top-0">
      <h2 className="text-left text-3xl font-bold">Annotating: <span className="italic">{props.project_name}</span></h2>
      <div>
        <NavigationMenu>
          <div className="flex space-x-4">
            <NavigationMenuItem>
              <NavigationMenuLink href="/" className="text-lg font-medium">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/about" className="text-lg font-medium">
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/services" className="text-lg font-medium">
                Services
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/contact" className="text-lg font-medium">
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>
        </NavigationMenu>
      </div>
    </div>
  )
}