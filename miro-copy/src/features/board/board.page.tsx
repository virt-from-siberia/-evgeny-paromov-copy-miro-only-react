import { useParams } from "react-router-dom";
import type { PathParams } from "@/shared/model/routes";
import { ROUTES } from "@/shared/model/routes";

export function BoardPage() {
  const { boardId } = useParams<PathParams[typeof ROUTES.BOARD]>();
  return <div>Board page {boardId}</div>;
}

export const Component = BoardPage;
