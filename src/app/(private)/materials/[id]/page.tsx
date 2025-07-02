"use client";
import { MaterialProps } from "@/@types/materials";
import { Card } from "@/components/ui/card";
import { materials } from "@/mock/materials";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Attachments } from "./components/attachments";
import { Form } from "./components/form";
import { Gallery } from "./components/gallery";
import { Header } from "./components/header";
import { Kpis } from "./components/kpis";
import OsTable from "./components/os-table";

export default function MaterialDetails() {
  const pathname = usePathname();
  const [selectedMaterial, setSelectedMaterial] =
    useState<MaterialProps | null>(null);

  useEffect(() => {
    const materialId = pathname.split("/materials/")[1];
    const material = materials.find(
      (material) => material.id === parseInt(materialId),
    );
    setSelectedMaterial(material || null);
  }, [pathname]);

  if (!selectedMaterial) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-default-800 text-primary text-xl font-medium 2xl:text-2xl">
          Materiais
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-12">
          <Card className="h-full overflow-hidden">
            <Header selectedMaterial={selectedMaterial} />
            <Form selectedMaterial={selectedMaterial} />
            <Kpis />
            <OsTable />
            <div className="flex w-full flex-col items-center justify-between gap-2 p-2 xl:flex-row xl:gap-4 xl:p-4">
              <Attachments />
              <Gallery />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
