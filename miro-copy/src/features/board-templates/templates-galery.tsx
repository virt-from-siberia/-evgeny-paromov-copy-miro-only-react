import { cn } from "@/shared/lib/utils";
import { ScrollArea } from "@/shared/ui/kit/scroll-area";

import { TemplateCard, type Template } from "./template-card";

const templates: Template[] = [
  {
    id: "1",
    name: "Мозговой штурм",
    description: "Соберите идеи команды на одной доске",
    thumbnail: "https://placehold.co/320x180/e2e8f0/64748b?text=Brainstorm",
  },
  {
    id: "2",
    name: "Канбан",
    description: "Отслеживайте задачи по колонкам",
    thumbnail: "https://placehold.co/320x180/e2e8f0/64748b?text=Kanban",
  },
  {
    id: "3",
    name: "Дорожная карта",
    description: "Планируйте релизы и этапы проекта",
    thumbnail: "https://placehold.co/320x180/e2e8f0/64748b?text=Roadmap",
  },
  {
    id: "4",
    name: "Ретроспектива",
    description: "Подведите итоги спринта с командой",
    thumbnail: "https://placehold.co/320x180/e2e8f0/64748b?text=Retro",
  },
];

type TemplatesGalleryLayout = "scroll" | "grid";

interface TemplatesGalleryProps {
  className?: string;
  onSelect?: (template: Template) => void;
  layout?: TemplatesGalleryLayout;
  compact?: boolean;
}

export function TemplatesGallery({
  className,
  onSelect,
  layout = "scroll",
  compact = false,
}: TemplatesGalleryProps) {
  const isGrid = layout === "grid";

  return (
    <ScrollArea className={cn("w-full", className)}>
      <div
        className={cn(
          isGrid
            ? "grid grid-cols-2 gap-3 pb-2 sm:grid-cols-3"
            : "flex w-max gap-4 pb-4",
        )}
      >
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            compact={compact}
            onSelect={(selected) => onSelect?.(selected)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
