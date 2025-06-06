import CalendarView from "./components/calender-view";
import { PlanningTable } from "./components/os-table";

export default function Planning() {
  return (
    <div className="space-y-6">
      <CalendarView />
      <PlanningTable />
    </div>
  );
}
