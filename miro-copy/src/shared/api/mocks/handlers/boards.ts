import { HttpResponse } from "msw";
import { http } from "../http";
import type { ApiSchemas } from "../../schema";
import { withMockDelay } from "../delay";
import { verifyTokenOrThrow } from "../session";

const BOARD_NAMES = [
  "Marketing Campaign", "Product Roadmap", "Design System", "Sprint Planning",
  "Customer Journey", "Brand Identity", "Tech Architecture", "User Research",
  "Content Strategy", "Sales Pipeline", "OKR Planning", "Retrospective",
  "Brainstorm Session", "Competitive Analysis", "Onboarding Flow",
  "Feature Mapping", "Data Model", "Team Wiki", "Release Notes", "API Docs",
];

function randomDate(yearsBack = 2) {
  const ms = Date.now() - Math.random() * yearsBack * 365 * 24 * 60 * 60 * 1000;
  return new Date(ms).toISOString();
}

const boards: ApiSchemas["Board"][] = Array.from({ length: 1000 }, (_, i) => {
  const createdAt = randomDate(2);
  const updatedAt = randomDate(1);
  const lastOpenedAt = randomDate(0.5);
  const baseName = BOARD_NAMES[i % BOARD_NAMES.length];
  return {
    id: `board-${i + 1}`,
    name: i < BOARD_NAMES.length ? baseName : `${baseName} ${Math.floor(i / BOARD_NAMES.length) + 1}`,
    createdAt,
    updatedAt,
    lastOpenedAt,
    isFavorite: Math.random() < 0.15,
  };
});

export const boardsHandlers = [
  http.get("/boards", async ({ request }) => {
    await verifyTokenOrThrow(request);
    await withMockDelay();

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? 1);
    const limit = Number(url.searchParams.get("limit") ?? 10);
    const sort = url.searchParams.get("sort") as ApiSchemas["Board"]["createdAt"] | null;
    const isFavoriteParam = url.searchParams.get("isFavorite");
    const search = url.searchParams.get("search")?.toLowerCase() ?? "";

    let filtered = [...boards];

    if (search) {
      filtered = filtered.filter((b) =>
        b.name.toLowerCase().includes(search),
      );
    }

    if (isFavoriteParam !== null) {
      const isFavorite = isFavoriteParam === "true";
      filtered = filtered.filter((b) => b.isFavorite === isFavorite);
    }

    if (sort) {
      filtered = filtered.sort((a, b) => {
        const aVal = a[sort as keyof ApiSchemas["Board"]] as string;
        const bVal = b[sort as keyof ApiSchemas["Board"]] as string;
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      });
    }

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const list = filtered.slice(start, start + limit);

    return HttpResponse.json({
      list,
      total,
      totalPages,
      currentPage: page,
      hasMore: page < totalPages,
    } satisfies ApiSchemas["BoardsList"]);
  }),

  http.get("/boards/{boardId}", async ({ params, request }) => {
    await verifyTokenOrThrow(request);
    await withMockDelay();

    const { boardId } = params;
    const board = boards.find((b) => b.id === boardId);

    if (!board) {
      return HttpResponse.json(
        { message: "Board not found", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    board.lastOpenedAt = new Date().toISOString();
    return HttpResponse.json(board);
  }),

  http.post("/boards", async ({ request }) => {
    await verifyTokenOrThrow(request);
    await withMockDelay();

    const data = (await request.json()) as { name: string };
    const now = new Date().toISOString();
    const board: ApiSchemas["Board"] = {
      id: crypto.randomUUID(),
      name: data.name,
      createdAt: now,
      updatedAt: now,
      lastOpenedAt: now,
      isFavorite: false,
    };
    boards.push(board);
    return HttpResponse.json(board, { status: 201 });
  }),

  http.post("/boards/{boardId}/rename", async ({ params, request }) => {
    await verifyTokenOrThrow(request);
    await withMockDelay();

    const { boardId } = params;
    const board = boards.find((b) => b.id === boardId);

    if (!board) {
      return HttpResponse.json(
        { message: "Board not found", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    const { name } = (await request.json()) as ApiSchemas["RenameBoard"];
    board.name = name;
    board.updatedAt = new Date().toISOString();
    return HttpResponse.json(board, { status: 201 });
  }),

  http.put("/boards/{boardId}/favorite", async ({ params, request }) => {
    await verifyTokenOrThrow(request);
    await withMockDelay();

    const { boardId } = params;
    const board = boards.find((b) => b.id === boardId);

    if (!board) {
      return HttpResponse.json(
        { message: "Board not found", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    const { isFavorite } =
      (await request.json()) as ApiSchemas["UpdateBoardFavorite"];
    board.isFavorite = isFavorite;
    board.updatedAt = new Date().toISOString();
    return HttpResponse.json(board, { status: 201 });
  }),

  http.delete("/boards/{boardId}", async ({ params, request }) => {
    await verifyTokenOrThrow(request);
    await withMockDelay();

    const { boardId } = params;
    const index = boards.findIndex((board) => board.id === boardId);

    if (index === -1) {
      return HttpResponse.json(
        { message: "Board not found", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    boards.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
