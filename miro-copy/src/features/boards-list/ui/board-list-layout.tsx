import type { ViewMode } from "./view-mode-toggle";
import { BoardsSidebar } from "./boards-sidebar";

export function BoardListLayout({
  headerSlot,
  filterSlot,
  children,
  sidebarSlot,
  templatesSlot,
}: {
  headerSlot: React.ReactNode;
  listSlot?: React.ReactNode;
  filterSlot?: React.ReactNode;
  children?: React.ReactNode;
  sidebarSlot?: React.ReactNode;
  templatesSlot?: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      <div className="flex gap-4">
        {sidebarSlot ?? <BoardsSidebar />}
        <div className="flex min-w-0 flex-1 flex-col gap-6 p-4">
          {templatesSlot && (
            <div className="rounded-md bg-muted p-4">{templatesSlot}</div>
          )}
          {headerSlot}
          {filterSlot}
          {children}
        </div>
      </div>
    </div>
  );
}

export function BoardListLayoutHeader({
  title,
  actionsSlot,
  description,
}: {
  title: string;
  description?: string;
  actionsSlot?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actionsSlot && <div className="flex gap-2">{actionsSlot}</div>}
    </div>
  );
}

export function BoardListLayoutFilters({
  actionsSlot,
  sortSlot,
  filtersSlot,
}: {
  actionsSlot?: React.ReactNode;
  sortSlot?: React.ReactNode;
  filtersSlot?: React.ReactNode;
}) {
  return (
    <div className="flex items-center mb-6 gap-4">
      <div className="flex items-center gap-2">
        <div className="text-sm text-gray-500 whitespace-nowrap">Filter by</div>
        {filtersSlot && filtersSlot}
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm text-gray-500 whitespace-nowrap">Sort by</div>
        {sortSlot && sortSlot}
      </div>

      {actionsSlot && <div className="ml-auto">{actionsSlot}</div>}
    </div>
  );
}

export function BoardListLayoutContent({
  isEmpty,
  isPending,
  isPendingNext,
  cursorRef,
  hasCursor,
  mode,
  children,
  renderList,
  renderGrid,
}: {
  isEmpty?: boolean;
  isPending?: boolean;
  isPendingNext?: boolean;
  cursorRef?: React.Ref<HTMLDivElement>;
  hasCursor?: boolean;
  mode: ViewMode;
  children?: React.ReactNode;
  renderList?: () => React.ReactNode;
  renderGrid?: () => React.ReactNode;
}) {
  return (
    <div>
      {children && children}
      {mode === "list" && (
        // <div className="flex flex-col gap-2">
        <>{renderList?.()}</>
        // }</div>
      )}
      {mode === "cards" && (
        // <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <> {renderGrid?.()}</>
        // </div>
      )}
      {isPendingNext && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Загрузка ещё…
        </p>
      )}

      {isEmpty && !isPending && (
        <p className="mt-8 text-center text-muted-foreground">
          Ничего не найдено. Попробуйте изменить фильтры или поиск.
        </p>
      )}

      {hasCursor && <div ref={cursorRef} className="h-8" aria-hidden />}
    </div>
  );
}

export function BoardsListLayoutCards({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {children}
    </div>
  );
}

export function BoardsListLayoutList({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

export function BoardsLayoutContentGroups({
  groups,
}: {
  groups: {
    title: string;
    items: React.ReactNode;
  }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {groups.map((group) => {
        return (
          <div key={group.title}>
            <div className="text-lg font-bold">{group.title}</div>
            {group.items}
          </div>
        );
      })}
    </div>
  );
}
