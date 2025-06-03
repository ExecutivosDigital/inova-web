import { EquipmentList } from "./components/equipmentList";
import { Priorities } from "./components/priorities";

export default function Equipments() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-default-800 text-primary text-2xl font-medium">
          Equipamentos
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 flex flex-col gap-4 lg:col-span-12">
          <Priorities />
        </div>
        <div className="col-span-12 flex flex-col gap-4 lg:col-span-12">
          <EquipmentList />
        </div>
      </div>
    </div>
  );
}
