import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/kit/dialog";

import { TemplatesGallery } from "./templates-galery";
import { type Template } from "./template-card";
import { useTemplatesModal } from "./use-templates-modal";

interface TemplatesModalProps {
  onSelectTemplate: (template: Template) => void;
}

export function TemplatesModal({ onSelectTemplate }: TemplatesModalProps) {
  const { isOpen, setIsOpen, close } = useTemplatesModal();

  const handleSelect = (template: Template) => {
    onSelectTemplate(template);
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Выберите шаблон</DialogTitle>
          <DialogDescription>
            Выберите шаблон для создания новой доски
          </DialogDescription>
        </DialogHeader>

        <TemplatesGallery
          className="max-h-[60vh] pr-4"
          layout="grid"
          compact
          onSelect={handleSelect}
        />
      </DialogContent>
    </Dialog>
  );
}
