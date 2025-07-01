"use client";
import { Modal } from "@/components/ui/modal";
import { MaterialAccordion } from "./forms/MaterialAccordion";
import { MaterialHeader } from "./forms/MaterialHeader";

interface NewMaterialModalProps {
  isOpen: boolean;
  close: () => void;
}

export function NewMaterialModal({ isOpen, close }: NewMaterialModalProps) {
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className="mt-4 flex flex-col gap-4 p-4">
        <MaterialHeader />
        <MaterialAccordion />
      </div>
    </Modal>
  );
}
