import type { ApiSchemas } from "@/shared/api/schema";
import { DropdownMenuItem } from "@/shared/ui/kit/dropdown-menu";
import { BoardCardFavoriteToggleAction } from "../ui/board-card-favorite-toggle-action";
import { useDeleteBoard } from "../models/use-delete-board";
import { useUpdateFavorite } from "../models/use-update-favorite";
import { BoardItem } from "../ui/board-item";

export function BoardItemComponent({ board }: { board: ApiSchemas["Board"] }) {
  const deleteBoard = useDeleteBoard();

  const updateFavorite = useUpdateFavorite();

  return (
    <BoardItem
      key={board.id}
      board={board}
      rightTopActions={
        <BoardCardFavoriteToggleAction
          board={board}
          isFavoritePending={updateFavorite.getIsPending(board.id)}
          onToggleFavorite={(currentBoard) =>
            updateFavorite.updateFavorite(
              currentBoard.id,
              !currentBoard.isFavorite,
            )
          }
        />
      }
      menuActions={
        <DropdownMenuItem
          variant="destructive"
          disabled={deleteBoard.getIsPending(board.id)}
          onClick={() => deleteBoard.deleteBoard(String(board.id))}
        >
          Удалить
        </DropdownMenuItem>
      }
    />
  );
}
