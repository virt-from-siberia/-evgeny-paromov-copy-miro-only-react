import type { ApiPaths, ApiSchemas } from "@/shared/api/schema";
import { ROUTES } from "@/shared/model/routes";
import { useRef, useState } from "react";
import { href, Link } from "react-router-dom";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Label } from "@/shared/ui/kit/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/kit/select";
import { Switch } from "@/shared/ui/kit/switch";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/kit/tabs";
import { useBoardsList } from "./use-boards-lits";
import {
  useFilters,
  type BoardSortOption,
  type FavoriteFilterOption,
} from "./use-filters";
import { useDebouncedValue } from "@/shared/lib/react";
import { useCreateBoard } from "./use-create-board";
import { useDeleteBoard } from "./use-delete-board";
import { useUpdateFavorite } from "./use-update-favorite";
import { BoardListLayout, BoardListLayoutHeader } from "./board-list-layout";

type BoardsListQuery = NonNullable<
  ApiPaths["/boards"]["get"]["parameters"]["query"]
>;
type BoardSort = NonNullable<BoardsListQuery["sort"]>;

const SORT_OPTIONS: { value: BoardSort; label: string }[] = [
  { value: "lastOpenedAt", label: "Недавно открытые" },
  { value: "updatedAt", label: "По дате изменения" },
  { value: "createdAt", label: "По дате создания" },
  { value: "name", label: "По названию" },
];

function BoardsListPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const boardFilters = useFilters();

  const [boardsList] = useState<ApiSchemas["Board"][]>([]);

  const createBoard = useCreateBoard({
    onSuccessAction: () => {
      formRef.current?.reset();
    },
  });

  const deleteBoard = useDeleteBoard();

  const updateFavorite = useUpdateFavorite();

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

  return (
    <BoardListLayout
      headerSlot={
        <BoardListLayoutHeader
          title="Boards list"
          description="Here you can view and manage your boards"
        />
      }
    >
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label className="text-muted-foreground" htmlFor="board-search">
            Поиск
          </Label>
          <Input
            id="board-search"
            type="search"
            placeholder="Название доски…"
            value={boardFilters.search}
            onChange={(e) => boardFilters.setSearch(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">Избранное</span>
          <Tabs
            value={boardFilters.favorite}
            onValueChange={(v) =>
              boardFilters.setFavorite(v as FavoriteFilterOption)
            }
          >
            <TabsList className="w-full max-w-xl flex-wrap justify-start">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="favorite">Избранные</TabsTrigger>
              <TabsTrigger value="not_favorite">Без избранного</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <Switch
              id="board-favorite-quick"
              checked={boardFilters.favorite === "favorite"}
              onCheckedChange={(checked) =>
                boardFilters.setFavorite(checked ? "favorite" : "all")
              }
            />
            <Label
              htmlFor="board-favorite-quick"
              className="text-sm font-normal"
            >
              Только избранные
            </Label>
          </div>
        </div>

        <div className="flex min-w-[220px] max-w-md flex-col gap-1">
          <Label className="text-muted-foreground" htmlFor="board-sort">
            Сортировка
          </Label>
          <Select
            value={boardFilters.sort}
            onValueChange={(v) => boardFilters.setSort(v as BoardSortOption)}
          >
            <SelectTrigger id="board-sort" className="w-full" size="default">
              <SelectValue placeholder="Выберите сортировку" />
            </SelectTrigger>
            <SelectContent position="popper">
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <form
        ref={formRef}
        className="mb-6 flex flex-wrap items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const name = (formData.get("name") as string)?.trim();
          if (!name) return;
          createBoard.createBoard(name);
        }}
      >
        <div className="flex flex-col gap-1">
          <label
            className="text-sm text-muted-foreground"
            htmlFor="new-board-name"
          >
            Новая доска
          </label>
          <Input
            id="new-board-name"
            type="text"
            name="name"
            placeholder="Название"
          />
        </div>
        <Button type="submit" disabled={createBoard.isPending}>
          Создать
        </Button>
      </form>

      {/* {boardsInfinite.isError && (
        <p className="mb-4 text-sm text-destructive">
          Не удалось загрузить список досок
        </p>
      )}

      // {boardsInfinite.isFetching && !boardsInfinite.isFetchingNextPage && (
      //   <p className="mb-4 text-sm text-muted-foreground">Загрузка…</p>
      // )} */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {boards.map((board: ApiSchemas["Board"]) => (
          <Card key={board.id}>
            <CardHeader className="flex-row items-start justify-between gap-2">
              <Button
                asChild
                variant="link"
                className="h-auto justify-start p-0"
              >
                <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
                  <span className="line-clamp-2 text-left">{board.name}</span>
                </Link>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="cursor-pointer"
                aria-label={
                  board.isFavorite
                    ? "Убрать из избранного"
                    : "Добавить в избранное"
                }
                disabled={updateFavorite.getIsPending(board.id)}
                onClick={() =>
                  updateFavorite.updateFavorite(board.id, !board.isFavorite)
                }
              >
                <span
                  className={
                    board.isFavorite
                      ? "text-amber-500 text-base"
                      : "text-muted-foreground text-base"
                  }
                  aria-hidden
                >
                  {board.isFavorite ? "★" : "☆"}
                </span>
              </Button>
            </CardHeader>
            <CardFooter>
              <Button
                variant="destructive"
                disabled={deleteBoard.getIsPending(board.id)}
                onClick={() => deleteBoard.deleteBoard(board.id)}
              >
                Удалить
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div ref={loadMoreRef} className="h-8" aria-hidden />

      {isFetchingNextPage && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Загрузка ещё…
        </p>
      )}

      {!hasNextPage && boards.length > 0 && !isPending && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Все доски загружены ({boardsList.length ?? boards.length})
        </p>
      )}

      {isPending && boards.length === 0 && (
        <p className="mt-8 text-center text-muted-foreground">
          Ничего не найдено. Попробуйте изменить фильтры или поиск.
        </p>
      )}

      {hasNextPage && <div ref={cursorRef} className="h-8" aria-hidden />}
    </BoardListLayout>
  );
}

export const Component = BoardsListPage;
