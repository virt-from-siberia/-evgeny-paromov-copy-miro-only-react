import type { ApiPaths, ApiSchemas } from "@/shared/api/schema";
import { useRef, useState } from "react";
import { Button } from "@/shared/ui/kit/button";

import { useBoardsList } from "./models/use-boards-lits";
import { useFilters } from "./models/use-filters";
import { useDebouncedValue } from "@/shared/lib/react";
import { useCreateBoard } from "./models/use-create-board";
import {
  BoardListLayout,
  BoardListLayoutContent,
  BoardListLayoutFilters,
  BoardListLayoutHeader,
} from "./ui/board-list-layout";
import { ViewModeToggle, type ViewMode } from "./ui/view-mode-toggle";
import { BoardSortSelect } from "./ui/board-sort-select";
import { BoardSearchInput } from "./ui/board-search-input";
import { PlusIcon } from "lucide-react";
import {
  TemplatesGallery,
  TemplatesModal,
  useTemplatesModal,
} from "@/features/board-templates";
import { BoardItemComponent } from "./compose/board-item";
import { BoardCardComponent } from "./compose/board-card";

type BoardsListQuery = NonNullable<
  ApiPaths["/boards"]["get"]["parameters"]["query"]
>;
type BoardSort = NonNullable<BoardsListQuery["sort"]>;

function BoardsListPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const boardFilters = useFilters();

  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const createBoard = useCreateBoard({
    onSuccessAction: () => {
      formRef.current?.reset();
    },
  });

  const templatesModal = useTemplatesModal();

  const { boards, isFetchingNextPage, isPending, hasNextPage, cursorRef } =
    useBoardsList({
      sort: boardFilters.sort as BoardSort,
      search: useDebouncedValue(boardFilters.search, 300),
      isFavorite:
        boardFilters.favorite === "favorite"
          ? true
          : boardFilters.favorite === "not_favorite"
            ? false
            : undefined,
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
    <>
      <TemplatesModal
        onSelectTemplate={(template) => createBoard.createBoard(template.name)}
      />
      <BoardListLayout
        templatesSlot={<TemplatesGallery />}
        headerSlot={
          <BoardListLayoutHeader
            title="Доски"
            description="Здесь вы можете просматривать и управлять своими досками"
            actionsSlot={
              <>
                <Button
                  variant="outline"
                  onClick={() => templatesModal.open()}
                >
                  Выбрать шаблон
                </Button>
                <Button
                  disabled={createBoard.isPending}
                  onClick={() =>
                    createBoard.createBoard(
                      (formRef.current?.name as unknown as HTMLInputElement)
                        .value,
                    )
                  }
                >
                  <PlusIcon />
                  Создать доску
                </Button>
              </>
            }
          />
        }
      filterSlot={
        <BoardListLayoutFilters
          filtersSlot={
            <>
              <BoardSearchInput
                value={boardFilters.search}
                onChange={boardFilters.setSearch}
              />
            </>
          }
          sortSlot={
            <BoardSortSelect
              value={boardFilters.sort}
              onValueChange={boardFilters.setSort}
            />
          }
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
      ></BoardListLayoutContent>
      </BoardListLayout>
    </>
  );
}

export const Component = BoardsListPage;
