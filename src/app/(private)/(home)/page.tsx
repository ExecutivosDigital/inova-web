import { DatePicker } from "@/components/date-picker";
import { DashboardGraphs } from "./components/dashboard-graphs";
import { Kpis } from "./components/kpis";
import { OsEquipments } from "./components/os-equipments";
import { OsList } from "./components/os-list";
import { OsTable } from "./components/os-table";

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-default-800 text-primary text-2xl font-medium">
          Dashboard
        </div>
        <DatePicker />
      </div>
      <div className="flex h-full w-full flex-col gap-4">
        <Kpis />
        <div className="flex flex-col gap-4 xl:grid xl:grid-cols-12">
          <OsTable />
          <OsList />
        </div>
        <OsEquipments />
        <DashboardGraphs />
      </div>
    </div>
  );
}
