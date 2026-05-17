import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/kit/select";
import { type BoardSortOption } from "../models/use-filters";

const SORT_OPTIONS: { value: BoardSortOption; label: string }[] = [
  { value: "lastOpenedAt", label: "Недавно открытые" },
  { value: "updatedAt", label: "По дате изменения" },
  { value: "createdAt", label: "По дате создания" },
  { value: "name", label: "По названию" },
];

type BoardSortSelectProps = {
  value: BoardSortOption;
  onValueChange: (value: BoardSortOption) => void;
};

export function BoardSortSelect({ value, onValueChange }: BoardSortSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => onValueChange(v as BoardSortOption)}
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
  );
}
