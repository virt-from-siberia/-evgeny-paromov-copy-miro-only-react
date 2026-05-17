import type { ApiSchemas } from "@/shared/api/schema";
import { Button } from "@/shared/ui/kit/button";

type BoardCardDeleteActionProps = {
  boardId: ApiSchemas["Board"]["id"];
  isDeletePending?: boolean;
  onDelete: (boardId: ApiSchemas["Board"]["id"]) => void;
};

export function BoardCardDeleteAction({
  boardId,
  isDeletePending = false,
  onDelete,
}: BoardCardDeleteActionProps) {
  return (
    <Button
      variant="destructive"
      disabled={isDeletePending}
      onClick={() => onDelete(boardId)}
    >
      Удалить
    </Button>
  );
}
