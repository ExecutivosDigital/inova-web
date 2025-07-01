"use client";
import { Modal } from "@/components/ui/modal";
import { EquipmentAccordion } from "./forms/EquipmentAccordion";
import { EquipmentHeader } from "./forms/EquipmentHeader";

interface NewMaterialModalProps {
  isOpen: boolean;
  close: () => void;
}

export function NewEquipmentModal({ isOpen, close }: NewMaterialModalProps) {
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className="mt-4 flex flex-col gap-4 p-2 md:p-4">
        <EquipmentHeader />
        <EquipmentAccordion />
      </div>
    </Modal>
  );
}
