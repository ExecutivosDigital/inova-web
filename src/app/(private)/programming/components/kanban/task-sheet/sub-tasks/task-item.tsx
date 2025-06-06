"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@iconify/react";
import { ArrowRightLeft, Check, Tag, Trash2 } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";
import AssignMembers from "../../common/assign-members";

import { activitySubTaskType } from "@/@staticData/activities/subtasks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const TaskItem = ({
  subtask,
  handlerSubSheet,
}: {
  subtask: activitySubTaskType;
  handlerSubSheet: () => void;
}) => {
  const { completed, assignDate } = subtask;
  const [isDone, setIsDone] = React.useState<boolean>(completed);
  // update isComplete

  const handleIsComplete = async () => {
    setIsDone(!isDone);
  };

  return (
    <>
      <div
        className={cn(
          "border-default-200 flex cursor-pointer gap-2 border-b border-dashed px-6 py-3",
          {
            "bg-default-50": completed,
          },
        )}
        onClick={handlerSubSheet}
      >
        <div className="mt-1 flex-none">
          <div onClick={(e) => e.stopPropagation()}>
            <Checkbox
              size="sm"
              checked={isDone}
              onCheckedChange={handleIsComplete}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex">
            <div
              className={cn("text-default-900 flex-1 text-base font-medium", {
                "line-through": completed,
              })}
            >
              {subtask?.title}
            </div>
            <div className="flex flex-none items-center gap-2">
              {/* assigned members */}
              {subtask?.assign?.length > 0 && (
                <div>
                  <AvatarGroup
                    max={3}
                    total={subtask.assign.length}
                    countClass="w-7 h-7"
                  >
                    {subtask.assign?.map((user, i) => (
                      <Avatar
                        className="ring-background ring-offset-background h-7 w-7 ring-1 ring-offset-[2px]"
                        key={`avatar-key-${i}`}
                      >
                        <AvatarImage src={user.image} />
                        <AvatarFallback>AB</AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </div>
              )}
              {/* add new members start*/}
              <div onClick={(e) => e.stopPropagation()}>
                <AssignMembers />
              </div>

              {/* add new members end*/}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    size="icon"
                    className="bg-default-100 text-primary hover:bg-default-100 relative h-6 w-6 rounded-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon
                      icon="heroicons:ellipsis-horizontal"
                      className="text-default-900 h-4 w-4"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit" align="end">
                  {!completed && (
                    <>
                      <DropdownMenuItem className="gap-2">
                        <Icon
                          icon="heroicons:calendar"
                          className="text-default-500 h-4 w-4"
                        />
                        Add a due date
                      </DropdownMenuItem>

                      <DropdownMenuItem className="gap-2">
                        <Tag className="text-default-500 h-4 w-4" />
                        Manage Tags
                      </DropdownMenuItem>

                      <DropdownMenuItem className="gap-2">
                        <Check className="text-default-500 h-4 w-4" />
                        Convert to a task
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <ArrowRightLeft className="text-default-500 h-4 w-4" />
                        Move into another task
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem
                    className="group hover:bg-destructive hover:text-destructive-foreground gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Trash2 className="text-default-500 group-hover:text-destructive-foreground h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3">
            {completed ? (
              <Badge
                color="success"
                variant="soft"
                className="rounded px-1 py-0 text-[10px] leading-4 capitalize"
              >
                Completed
              </Badge>
            ) : (
              <Badge
                color="warning"
                variant="soft"
                className="rounded px-1 py-0 text-[10px] leading-4 capitalize"
              >
                {subtask.priority}
              </Badge>
            )}

            <div className="text-default-500 flex items-center gap-1 text-xs">
              <Icon
                icon="heroicons:calendar"
                className="text-default-500 h-3.5 w-3.5"
              />
              <span>{assignDate}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
