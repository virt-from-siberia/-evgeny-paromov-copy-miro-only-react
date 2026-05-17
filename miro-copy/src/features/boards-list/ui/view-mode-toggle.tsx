import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/kit/tabs";
import { ImagesIcon, ListIcon } from "lucide-react";

export type ViewMode = "list" | "cards";

export function ViewModeToggle({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}) {
  return (
    <>
      <Tabs value={value} onValueChange={(v) => onChange(v as ViewMode)}>
        <TabsList className="w-full max-w-xl flex-wrap justify-start">
          <TabsTrigger value="list" className="cursor-pointer">
            <ListIcon />
          </TabsTrigger>
          <TabsTrigger value="cards" className="cursor-pointer">
            <ImagesIcon />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}
