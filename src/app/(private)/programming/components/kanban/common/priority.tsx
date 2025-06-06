"use client";

import { activityTaskType } from "@/@staticData/activities/tasks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react"; // Import useState hook
const Priority = ({
  task,
  taskId,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  task?: activityTaskType | any;
  taskId?: activityTaskType["id"];
}) => {
  const [selectedPriority, setSelectedPriority] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    activityTaskType | any
  >(task?.priority);

  const handlePriorityChange = async (value: string) => {
    if (taskId) {
      setSelectedPriority(value);
    }
  };

  return (
    <>
      <div className="w-[100px]">
        <Select value={selectedPriority} onValueChange={handlePriorityChange}>
          <SelectTrigger size="sm" variant="flat" color="primary">
            <SelectValue placeholder="select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Priority;
