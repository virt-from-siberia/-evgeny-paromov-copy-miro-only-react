import { Button } from "@/shared/ui/kit/button";
import { cn } from "@/shared/lib/utils";
import { PlusIcon } from "lucide-react";

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
  className?: string;
  compact?: boolean;
}

export function TemplateCard({
  template,
  onSelect,
  className,
  compact = false,
}: TemplateCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        "group relative cursor-pointer rounded-lg border transition-colors hover:border-primary",
        compact ? "p-2.5" : "w-56 shrink-0 p-4",
        className,
      )}
      onClick={() => onSelect(template)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(template);
        }
      }}
    >
      <div
        className={cn(
          "overflow-hidden rounded-md bg-muted",
          compact ? "mb-2 aspect-[4/3]" : "mb-4 aspect-video",
        )}
      >
        <img
          src={template.thumbnail}
          alt={template.name}
          className="h-full w-full object-cover"
        />
      </div>
      <h3
        className={cn(
          "font-medium",
          compact ? "mb-0.5 text-sm leading-tight" : "mb-1",
        )}
      >
        {template.name}
      </h3>
      <p
        className={cn(
          "text-muted-foreground",
          compact ? "line-clamp-2 text-xs leading-snug" : "text-sm",
        )}
      >
        {template.description}
      </p>
      <Button
        size={compact ? "xs" : "sm"}
        className={cn(
          "absolute opacity-0 transition-opacity group-hover:opacity-100",
          compact ? "top-2 right-2" : "top-4 right-4",
        )}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(template);
        }}
      >
        <PlusIcon className={cn(compact ? "size-3" : "mr-2 h-4 w-4")} />
        {!compact && "Использовать"}
      </Button>
    </div>
  );
}
