import { ROUTES } from "@/shared/model/routes";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/kit/button";
import { ClockIcon, LayoutGridIcon, StarIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface BoardsSidebarProps {
  className?: string;
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground");

export function BoardsSidebar({ className }: BoardsSidebarProps) {
  return (
    <aside className={cn("w-64 shrink-0 border-r p-4 space-y-4", className)}>
      <div className="space-y-2">
        <div className="px-2 text-sm font-medium text-muted-foreground">
          Навигация
        </div>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <NavLink to={ROUTES.BOARDS} end className={navLinkClass}>
            <LayoutGridIcon className="mr-2 h-4 w-4" />
            Все доски
          </NavLink>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <NavLink to={ROUTES.BOARDS_FAVORITE} className={navLinkClass}>
            <StarIcon className="mr-2 h-4 w-4" />
            Избранное
          </NavLink>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <NavLink to={ROUTES.BOARDS_RESENT} className={navLinkClass}>
            <ClockIcon className="mr-2 h-4 w-4" />
            Недавние
          </NavLink>
        </Button>
      </div>
    </aside>
  );
}
