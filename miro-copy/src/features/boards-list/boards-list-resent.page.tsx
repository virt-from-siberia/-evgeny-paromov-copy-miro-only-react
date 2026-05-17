import type { ApiSchemas } from "@/shared/api/schema";
import { useState } from "react";

import { useBoardsList } from "./models/use-boards-lits";
import {
  BoardListLayout,
  BoardListLayoutContent,
  BoardListLayoutHeader,
  BoardsLayoutContentGroups,
  BoardsListLayoutCards,
  BoardsListLayoutList,
} from "./ui/board-list-layout";
import { type ViewMode, ViewModeToggle } from "./ui/view-mode-toggle";

import { useResentGroups } from "./models/use-resent-groups";
import { BoardItemComponent } from "./compose/board-item";
import { BoardCardComponent } from "./compose/board-card";

function ResentPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const { boards, isFetchingNextPage, isPending, hasNextPage, cursorRef } =
    useBoardsList({
      sort: "lastOpenedAt",
    });

  const recentGroups = useResentGroups(boards);

  const renderBoardListItem = (board: ApiSchemas["Board"]) => (
    <BoardItemComponent board={board} />
  );

  const renderBoardGridItem = (board: ApiSchemas["Board"]) => (
    <BoardCardComponent board={board} />
  );

  const renderBoards = (items: ApiSchemas["Board"][]) =>
    viewMode === "list" ? (
      <BoardsListLayoutList>
        {items.map(renderBoardListItem)}
      </BoardsListLayoutList>
    ) : (
      <BoardsListLayoutCards>
        {items.map(renderBoardGridItem)}
      </BoardsListLayoutCards>
    );

  return (
    <BoardListLayout
      headerSlot={
        <BoardListLayoutHeader
          title="Последние доски"
          description="Здесь вы можете просматривать и управлять своими последними досками"
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
      >
        <BoardsLayoutContentGroups
          groups={recentGroups.map((group) => ({
            title: group.title,
            items: renderBoards(group.items),
          }))}
        />
      </BoardListLayoutContent>
    </BoardListLayout>
  );
}

export const Component = ResentPage;
