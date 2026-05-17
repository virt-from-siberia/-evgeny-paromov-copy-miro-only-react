import type { ApiSchemas } from "@/shared/api/schema";
import { ROUTES } from "@/shared/model/routes";
import { href, Link } from "react-router-dom";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import { Button } from "@/shared/ui/kit/button";

type BoardCardProps = {
  board: ApiSchemas["Board"];

  rightTopActions: React.ReactNode;
  bottomActions: React.ReactNode;
};

export function BoardCard({
  board,
  rightTopActions,
  bottomActions,
}: BoardCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-2">
        <Button asChild variant="link" className="h-auto justify-start p-0">
          <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
            <span className="line-clamp-2 text-left">{board.name}</span>
          </Link>
        </Button>

        {rightTopActions && rightTopActions}
      </CardHeader>
      <CardFooter>{bottomActions && bottomActions}</CardFooter>
    </Card>
  );
}
