import { Link } from "react-router";

import { cn } from "~/lib/utils";

import { NavigationMenuLink } from "./ui/navigation-menu";

interface ListItemProps {
  className?: string;
  title: string;
  href?: string;
}
const ListItem = ({
  className,
  title,
  href = "#",
  ...props
}: ListItemProps) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "block select-none cursor-pointer space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-blue-700",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
export default ListItem;
