import { Input } from "@/shared/ui/kit/input";

type BoardSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function BoardSearchInput({ value, onChange }: BoardSearchInputProps) {
  return (
    <Input
      id="board-search"
      type="search"
      placeholder="Название доски…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete="off"
    />
  );
}
