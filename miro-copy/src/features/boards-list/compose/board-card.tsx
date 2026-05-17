import { BoardCard } from "../ui/board-card";
import { BoardCardDeleteAction } from "../ui/board-card-delete-action";
import { BoardCardFavoriteToggleAction } from "../ui/board-card-favorite-toggle-action";
import { useDeleteBoard } from "../models/use-delete-board";
import type { ApiSchemas } from "@/shared/api/schema";
import { useUpdateFavorite } from "../models/use-update-favorite";

export function BoardCardComponent({ board }: { board: ApiSchemas["Board"] }) {
  const deleteBoard = useDeleteBoard();
  const updateFavorite = useUpdateFavorite();

  return (
    <BoardCard
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
      bottomActions={
        <BoardCardDeleteAction
          boardId={board.id}
          isDeletePending={deleteBoard.getIsPending(board.id)}
          onDelete={(boardId) => deleteBoard.deleteBoard(String(boardId))}
        />
      }
    />
  );
}
