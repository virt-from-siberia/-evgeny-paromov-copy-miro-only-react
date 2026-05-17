import type { ApiSchemas } from "@/shared/api/schema";
import { useMemo } from "react";

type BoardsGroup = {
  title: string;
  items: ApiSchemas["Board"][];
};

const GROUP_ORDER = ["Сегодня", "Вчера", "Прошлый месяц", "Другое"] as const;

export function useResentGroups(boards: ApiSchemas["Board"][]): BoardsGroup[] {
  return useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const groups = boards.reduce<BoardsGroup[]>((acc, board) => {
      const lastOpenedAt = new Date(board.lastOpenedAt);
      lastOpenedAt.setHours(0, 0, 0, 0);

      let groupTitle: string;
      if (lastOpenedAt.getTime() === today.getTime()) {
        groupTitle = "Сегодня";
      } else if (lastOpenedAt.getTime() === yesterday.getTime()) {
        groupTitle = "Вчера";
      } else if (lastOpenedAt >= lastMonth) {
        groupTitle = "Прошлый месяц";
      } else {
        groupTitle = "Другое";
      }

      const group = acc.find((g) => g.title === groupTitle);
      if (group) {
        group.items.push(board);
      } else {
        acc.push({ title: groupTitle, items: [board] });
      }

      return acc;
    }, []);

    return GROUP_ORDER.map((title) =>
      groups.find((g) => g.title === title),
    ).filter((group): group is BoardsGroup => group !== undefined);
  }, [boards]);
}
