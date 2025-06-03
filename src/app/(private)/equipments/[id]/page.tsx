"use client";
import { EquipmentsProps } from "@/@types/equipments";
import { Card } from "@/components/ui/card";
import { equipments } from "@/mock/equipments";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Attachments } from "./components/attachments";
import { Form } from "./components/form";
import { Gallery } from "./components/gallery";
import { Header } from "./components/header";
import { Kpis } from "./components/kpis";
import OsTable from "./components/os-table";

export default function EquipmentDetails() {
  const pathname = usePathname();
  const [selectedEquipment, setSelectedEquipment] =
    useState<EquipmentsProps | null>(null);

  useEffect(() => {
    const equipmentId = pathname.split("/equipments/")[1];
    const equipment = equipments.find(
      (equipment) => equipment.id === parseInt(equipmentId),
    );
    setSelectedEquipment(equipment || null);
  }, [pathname]);

  if (!selectedEquipment) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-default-800 text-primary text-2xl font-medium">
          Equipamento
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-12">
          <Card className="h-full overflow-hidden">
            <Header selectedEquipment={selectedEquipment} />
            <Form selectedEquipment={selectedEquipment} />
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
