"use client";
import { activityTaskType } from "@/@staticData/activities/tasks";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@iconify/react";
import { Check, Hash, List, Plus } from "lucide-react";
import AssignList from "../common/assign-list";
import AssignMembers from "../common/assign-members";
import AssignTags from "../common/assign-tags";
import Dependency from "../common/dependency";
import Priority from "../common/priority";
import StoryPoint from "../common/story-point";
import TaskDate from "../common/task-date";

const SheetActions = ({
  task,
  taskId,
}: {
  task: activityTaskType;
  taskId: activityTaskType["id"];
}) => {
  return (
    <div className="border-default-200 border-b px-4 py-5 lg:px-6">
      <div className="grid grid-cols-2 gap-y-6 md:grid-cols-3 md:gap-2">
        {/* assignd members */}
        <div>
          <div className="mb-3 flex items-center gap-1">
            <div className="bg-default-100 grid h-6 w-6 place-content-center rounded-full">
              <Icon
                icon="heroicons:user-plus"
                className="text-primary h-3.5 w-3.5"
              />
            </div>
            <span className="text-default-900 text-sm font-medium">
              Assigned
            </span>
          </div>
          <div className="flex items-center gap-3">
            {task?.assign?.length > 0 && (
              <AvatarGroup
                countClass="w-5 h-5"
                total={task?.assign?.length}
                max={3}
              >
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {task?.assign?.map((member: any, i: number) => (
                  <TooltipProvider key={`assign-member-task-${i}`}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Avatar className="ring-background ring-offset-background h-5 w-5 ring-1 ring-offset-[2px]">
                          <AvatarImage src={member.image.src} />
                          <AvatarFallback></AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="px-1 py-[2px]">
                        <p className="text-xs font-medium">{member.name}</p>
                        <TooltipArrow className="fill-primary" />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </AvatarGroup>
            )}
            <AssignMembers icon={<Plus className="text-primary h-3 w-3" />} />
          </div>
        </div>
        <div>
          <div className="mb-3 flex items-center gap-1">
            <div className="bg-default-100 grid h-6 w-6 place-content-center rounded-full">
              <Icon
                icon="heroicons:scale"
                className="text-primary h-3.5 w-3.5"
              />
            </div>
            <span className="text-default-900 text-sm font-medium">
              Priority
            </span>
          </div>
          <Priority task={task} taskId={taskId} />
        </div>
        {/*  assigned list*/}
        <div>
          <div className="mb-2 flex items-center gap-1">
            <div className="bg-default-100 grid h-6 w-6 place-content-center rounded-full">
              <List className="text-primary h-3.5 w-3.5" />
            </div>
            <span className="text-default-900 text-sm font-medium">List</span>
          </div>
          <AssignList />
        </div>

        {/* task date */}
        <div>
          <div className="mb-3 flex items-center gap-1">
            <div className="bg-default-100 grid h-6 w-6 place-content-center rounded-full">
              <Icon
                icon="heroicons:calendar"
                className="text-primary h-3.5 w-3.5"
              />
            </div>
            <span className="text-default-900 text-sm font-medium">Date</span>
          </div>
          <TaskDate />
        </div>

        <div>
          <div className="mb-1 flex items-center gap-1">
            <div className="bg-default-100 grid h-6 w-6 place-content-center rounded-full">
              <Check className="text-primary h-3.5 w-3.5" />
            </div>
            <span className="text-default-900 text-sm font-medium">
              Dependency
            </span>
          </div>
          <Dependency />
        </div>
        <div>
          <div className="mb-3 flex items-center gap-1">
            <div className="bg-default-100 grid h-6 w-6 place-content-center rounded-full">
              <Hash className="text-primary h-3.5 w-3.5" />
            </div>
            <span className="text-default-900 text-sm font-medium">
              Story Points
            </span>
          </div>
          <StoryPoint />
        </div>
      </div>
      <div className="mt-6">
        <AssignTags task={task} />
      </div>
    </div>
  );
};

export default SheetActions;
