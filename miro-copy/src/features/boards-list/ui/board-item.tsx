import type { ApiSchemas } from "@/shared/api/schema";
import { ROUTES } from "@/shared/model/routes";
import { href, Link } from "react-router-dom";
import { Button } from "@/shared/ui/kit/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";

type BoardItemProps = {
  board: ApiSchemas["Board"];
  rightTopActions: React.ReactNode;
  menuActions: React.ReactNode;
};

export function BoardItem({
  board,
  rightTopActions,
  menuActions,
}: BoardItemProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-b px-3 py-3 last:border-b-0">
      <div className="min-w-0 flex-1">
        <Button asChild variant="link" className="h-auto justify-start p-0">
          <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
            <span className="line-clamp-1 text-left">{board.name}</span>
          </Link>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        {rightTopActions}
        {menuActions && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-lg">
                <MoreHorizontalIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">{menuActions}</DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
