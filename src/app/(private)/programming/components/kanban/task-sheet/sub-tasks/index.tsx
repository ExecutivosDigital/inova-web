"use client";
import { activitySubTaskType } from "@/@staticData/activities/subtasks";
import { activityTaskType } from "@/@staticData/activities/tasks";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import AddSubTask from "./add-sub-task";
import SubtaskDetailsSheet from "./subtask-details";
import TaskItem from "./task-item";
const SubTasks = ({
  subTasks,
  taskId,
}: {
  subTasks: activitySubTaskType[];
  taskId: activityTaskType["id"];
}) => {
  const [showComplete, setShowComplete] = useState<boolean>(false);
  const filteredSubtasks = subTasks.filter((st) => st.taskId === taskId);
  const completedSubtasks = filteredSubtasks.filter(
    (taskItem) => taskItem.completed === true,
  );

  const handleShowCompleteTask = () => setShowComplete(!showComplete);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenSubTaskSheet = () => setOpen(true);
  const handleCloseSubtaskSheet = () => setOpen(false);

  const totalSubtasks = filteredSubtasks.length;

  return (
    <>
      <div className="pt-3">
        <div className="mb-2 flex px-6">
          <div className="flex-1 text-base font-medium capitalize text-default-700">
            Progress
          </div>
          <div className="flex flex-1 items-center gap-2">
            <div className="flex-none text-xs font-medium text-default-500">
              {completedSubtasks.length}/{totalSubtasks}
            </div>
            <div className="flex-1">
              <Progress
                value={
                  totalSubtasks > 0
                    ? (completedSubtasks.length / totalSubtasks) * 100
                    : 0
                }
                size="sm"
              />
            </div>
          </div>
        </div>
        <div>
          {filteredSubtasks
            .filter((taskItem) => !taskItem.completed)
            .map((subtask) => (
              <TaskItem
                subtask={subtask}
                key={`task-item-key-${subtask.id}`}
                handlerSubSheet={handleOpenSubTaskSheet}
              />
            ))}
        </div>
        <AddSubTask taskId={taskId} />
        <div
          className="flex cursor-pointer items-center gap-1 px-6 py-4 text-xs font-medium text-default-500"
          onClick={handleShowCompleteTask}
        >
          {completedSubtasks.length} Completed Subtask{" "}
          <ChevronDown className="h-4 w-4" />
        </div>

        <Collapsible open={showComplete} onOpenChange={setShowComplete}>
          <CollapsibleContent className="CollapsibleContent">
            {completedSubtasks.map((subtask) => (
              <TaskItem
                subtask={subtask}
                key={`task-item-complete-key-${subtask.id}`}
                handlerSubSheet={handleOpenSubTaskSheet}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
      <SubtaskDetailsSheet open={open} onClose={handleCloseSubtaskSheet} />
    </>
  );
};

export default SubTasks;
