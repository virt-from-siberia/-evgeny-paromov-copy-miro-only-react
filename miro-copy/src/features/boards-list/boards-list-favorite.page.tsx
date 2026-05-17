import type { ApiSchemas } from "@/shared/api/schema";
import { useState } from "react";

import { useBoardsList } from "./models/use-boards-lits";

import {
  BoardListLayout,
  BoardListLayoutContent,
  BoardListLayoutHeader,
} from "./ui/board-list-layout";
import { type ViewMode, ViewModeToggle } from "./ui/view-mode-toggle";

import { BoardItemComponent } from "./compose/board-item";
import { BoardCardComponent } from "./compose/board-card";

function BoardsListFavoritePage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const { boards, isFetchingNextPage, isPending, hasNextPage, cursorRef } =
    useBoardsList({
      isFavorite: true,
    });

  const renderList = () =>
    boards.map((board: ApiSchemas["Board"]) => (
      <BoardItemComponent board={board} />
    ));

  const renderGrid = () =>
    boards.map((board: ApiSchemas["Board"]) => (
      <BoardCardComponent board={board} />
    ));

  return (
    <BoardListLayout
      headerSlot={
        <BoardListLayoutHeader
          title="Избранные доски"
          description="Здесь вы можете просматривать и управлять своими избранными досками"
          actionsSlot={
            <ViewModeToggle value={viewMode} onChange={setViewMode} />
          }
        />
      }
    >
      <BoardListLayoutContent
        isEmpty={boards.length === 0}
        isPending={isPending}
        isPendingNext={isFetchingNextPage}
        cursorRef={cursorRef}
        hasCursor={hasNextPage}
        mode={viewMode}
        renderList={renderList}
        renderGrid={renderGrid}
      />
    </BoardListLayout>
  );
}

export const Component = BoardsListFavoritePage;
