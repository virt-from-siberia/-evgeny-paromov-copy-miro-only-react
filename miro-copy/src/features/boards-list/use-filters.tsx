import { useState } from "react";

export type BoardSortOption =
  | "createdAt"
  | "updatedAt"
  | "lastOpenedAt"
  | "name";

export type FavoriteFilterOption = "all" | "favorite" | "not_favorite";

export type BoardFilters = {
  search: string;
  sort: BoardSortOption;
  favorite: FavoriteFilterOption;
};

export function useFilters() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<BoardSortOption>("lastOpenedAt");
  const [favorite, setFavorite] = useState<FavoriteFilterOption>("all");

  return {
    search,
    sort,
    favorite,
    setSearch,
    setSort,
    setFavorite,
  };
}
