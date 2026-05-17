import type { ApiSchemas } from "@/shared/api/schema";
import { Button } from "@/shared/ui/kit/button";

type BoardCardFavoriteToggleActionProps = {
  board: ApiSchemas["Board"];
  isFavoritePending?: boolean;
  onToggleFavorite: (board: ApiSchemas["Board"]) => void;
};

export function BoardCardFavoriteToggleAction({
  board,
  isFavoritePending = false,
  onToggleFavorite,
}: BoardCardFavoriteToggleActionProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="cursor-pointer"
      aria-label={
        board.isFavorite ? "Убрать из избранного" : "Добавить в избранное"
      }
      disabled={isFavoritePending}
      onClick={() => onToggleFavorite(board)}
    >
      <span
        className={
          board.isFavorite
            ? "text-amber-500 text-xl"
            : "text-muted-foreground text-xl"
        }
        aria-hidden
      >
        {board.isFavorite ? "★" : "☆"}
      </span>
    </Button>
  );
}
