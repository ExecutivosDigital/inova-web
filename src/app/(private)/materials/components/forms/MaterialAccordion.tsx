"use client";
import { Accordion } from "@/components/ui/accordion";
import { useMaterialContext } from "@/context/MaterialContext";
import { BasicDataAccordion } from "./BasicDataAccordion";
import { StockAccordion } from "./StockAccordion";
import { SupplierAccordion } from "./SupplierAccordion";
import { TechInfoAccordion } from "./TechInfoAccordion";

export function MaterialAccordion() {
  const { selectedMaterialStep, setSelectedMaterialStep } =
    useMaterialContext();
  return (
    <Accordion
      type="single"
      defaultValue="1"
      className="w-full space-y-3.5"
      value={String(selectedMaterialStep)}
      onValueChange={(value) => setSelectedMaterialStep(Number(value))}
    >
      <BasicDataAccordion
        selectedMaterialStep={selectedMaterialStep}
        setSelectedMaterialStep={setSelectedMaterialStep}
      />
      <TechInfoAccordion
        selectedMaterialStep={selectedMaterialStep}
        setSelectedMaterialStep={setSelectedMaterialStep}
      />
      <StockAccordion
        selectedMaterialStep={selectedMaterialStep}
        setSelectedMaterialStep={setSelectedMaterialStep}
      />
      <SupplierAccordion
        selectedMaterialStep={selectedMaterialStep}
        setSelectedMaterialStep={setSelectedMaterialStep}
      />
    </Accordion>
  );
}
