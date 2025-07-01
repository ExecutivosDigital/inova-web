import CalendarView from "./components/calender-view";
import DnDKitGuide from "./components/kanban/DndKitGuide";
import { ProgrammingTable } from "./components/programming-table";

export default function Planning() {
  return (
    <div className="space-y-6">
      <CalendarView />
      <DnDKitGuide />
      <ProgrammingTable />
    </div>
  );
}
