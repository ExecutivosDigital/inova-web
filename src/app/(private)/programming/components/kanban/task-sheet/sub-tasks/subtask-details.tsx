"use client";
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
import { faker } from "@faker-js/faker";
import { Icon } from "@iconify/react";

import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import SubTaskHeader from "./subtask-header";

import { Plus } from "lucide-react";
import AssignMembers from "../../common/assign-members";
import Priority from "../../common/priority";
import TaskDate from "../../common/task-date";
import Comments from "../comments";

const members = [
  {
    name: "Nick Jonas",
    value: "userid1",
    image: faker.image.avatarLegacy(),
  },
  {
    name: "Fahim",
    value: "userid2",
    image: faker.image.avatarLegacy(),
  },
  {
    name: "Nayeem",
    value: "userid3",
    image: faker.image.avatarLegacy(),
  },
  {
    name: "Iftekhar",
    value: "userid4",
    image: faker.image.avatarLegacy(),
  },
];
const SubtaskDetailsSheet = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Sheet open={open}>
      <SheetContent
        side="right"
        onClose={onClose}
        className="flex w-full flex-col border-none p-0 md:min-w-[600px]"
      >
        <SheetHeader className="flex-none">
          <SubTaskHeader />
        </SheetHeader>
        {/* actions */}
        <div className="grid flex-none grid-cols-3 gap-2 p-6">
          {/* assignd members */}
          <div>
            <div className="mb-3 flex items-center gap-1">
              <div className="grid h-6 w-6 place-content-center rounded-full bg-default-100">
                <Icon
                  icon="heroicons:user-plus"
                  className="h-3.5 w-3.5 text-primary"
                />
              </div>
              <span className="text-sm font-medium text-default-900">
                Assigned
              </span>
            </div>
            <div className="flex items-center gap-3">
              <AvatarGroup
                max={3}
                total={members.length - 3}
                countClass="w-6 h-6"
              >
                {members?.map((item, index) => (
                  <TooltipProvider key={`task-assigned-members-${index}`}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Avatar className="h-6 w-6 ring-1 ring-background ring-offset-[2px] ring-offset-background">
                          <AvatarImage src={item.image} />
                          <AvatarFallback>AB</AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent
                        color="primary"
                        side="bottom"
                        className="px-2 py-[2px]"
                      >
                        <p className="text-xs font-medium">{item.name}</p>
                        <TooltipArrow className="fill-primary" />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}

                <Avatar className="h-6 w-6 ring-1 ring-background ring-offset-[2px] ring-offset-background">
                  <AvatarFallback className="font-normal">+10</AvatarFallback>
                </Avatar>
              </AvatarGroup>
              {/* add new member */}
              <AssignMembers icon={<Plus className="h-4 w-4 text-primary" />} />
            </div>
          </div>
          {/* assigned members end */}
          {/* priority */}
          <div>
            <div className="mb-3 flex items-center gap-1">
              <div className="grid h-6 w-6 place-content-center rounded-full bg-default-100">
                <Icon
                  icon="heroicons:scale"
                  className="h-3.5 w-3.5 text-primary"
                />
              </div>
              <span className="text-sm font-medium text-default-900">
                Priority
              </span>
            </div>
            <Priority />
          </div>
          {/* priority end */}
          {/* start date */}

          {/* task date */}
          <div>
            <div className="mb-3 flex items-center gap-1">
              <div className="grid h-6 w-6 place-content-center rounded-full bg-default-100">
                <Icon
                  icon="heroicons:calendar"
                  className="h-3.5 w-3.5 text-primary"
                />
              </div>
              <span className="text-sm font-medium text-default-900">Date</span>
            </div>
            <TaskDate />
          </div>

          {/* end date */}
        </div>
        <div className="flex-1">
          <Comments className="h-[calc(100vh-450px)]" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SubtaskDetailsSheet;
