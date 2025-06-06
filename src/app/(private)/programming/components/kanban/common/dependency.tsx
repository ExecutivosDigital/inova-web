"use client";

import { Button } from "@/components/ui/button";
import { CustomPopover } from "@/components/ui/popover";
import { X } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useState } from "react";

const data = [
  {
    name: "Create Layout",
    projectId: "DT 01",
    date: "Jan 07",
  },
  {
    name: "Create Theme",
    projectId: "DT 01",
    date: "Jan 08",
  },
  {
    name: "Create Components",
    projectId: "DT 01",
    date: "Jan 09",
  },
];
const Dependency = () => {
  const [open, setOpen] = useState<boolean>(false);
  const togglePopover = () => setOpen(!open);

  return (
    <CustomPopover
      trigger={
        <Button
          type="button"
          onClick={togglePopover}
          className="cursor-pointer bg-transparent p-0 text-sm font-medium text-primary hover:bg-transparent hover:underline"
        >
          Set
        </Button>
      }
      open={open}
      onClose={() => setOpen(false)}
    >
      <div className="flex items-center justify-between border-b border-default-300 bg-default-50 px-3 py-3">
        <div className="text-sm font-medium text-default-900">
          Set Task Dependency
        </div>
        <Button
          type="button"
          size="icon"
          className="h-6 w-6 rounded-full bg-default-400"
          onClick={togglePopover}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <Command className="p-2">
        <CommandInput
          placeholder="Search tasks..."
          inputWrapper="border border-default-200 rounded-md"
          className="h-9"
        ></CommandInput>
        <CommandEmpty>No Task found</CommandEmpty>
        <CommandGroup>
          {data.map((item, index) => (
            <CommandItem
              key={`assigned-list-item-${index}`}
              className="flex-col items-start p-2"
            >
              <div className="text-defaut-800 text-sm font-semibold">
                {item.name}
              </div>
              <div className="mt-1 flex items-center gap-1">
                <div className="h-5 rounded border border-default-200 px-2 text-xs font-medium leading-5">
                  {item.projectId}
                </div>
                <div className="text-sm text-default-700">{item.date}</div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </Command>
    </CustomPopover>
  );
};

export default Dependency;
