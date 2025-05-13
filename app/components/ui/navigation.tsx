import ListItem from "../list-item";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";

const Navigation = () => {
  return (
    <div className="max-w-screen-xl mx-auto m-2">
      <NavigationMenu>
        <NavigationMenuList>
          {/* Users Dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-blue-600 hover:text-blue-800 focus:text-blue-800 data-[active]:text-blue-800 data-[state=open]:text-blue-800">
              Usuarios
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {/* Use ul for semantic list structure */}
              <ul className="grid gap-3 p-2 md:w-[400px] lg:w-[200px]">
                <ListItem href="/users/new" title="Nuevo Usuario" />
                <ListItem href="/users" title="Listado de Usuarios" />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Torneos Dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-blue-600 hover:text-blue-800 focus:text-blue-800 data-[active]:text-blue-800 data-[state=open]:text-blue-800">
              Torneos
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-2 md:w-[400px] lg:w-[200px]">
                <ListItem href="/tournaments/new" title="Nuevo Torneo" />
                <ListItem href="/tournaments" title="Listado de Torneos" />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navigation;
