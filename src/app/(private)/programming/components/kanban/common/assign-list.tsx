"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomPopover } from "@/components/ui/popover";
import { X } from "lucide-react";
import { useState } from "react";
const list = [
  {
    name: "Project Title",
  },
  {
    name: "Dashtail Admin Template",
  },
  {
    name: "User Template",
  },
];
const AssignList = () => {
  const [open, setOpen] = useState<boolean>(false);
  const togglePopover = () => setOpen(!open);

  return (
    <CustomPopover
      trigger={
        <Button
          type="button"
          onClick={togglePopover}
          className="bg-transparent text-sm font-medium text-default-500 hover:bg-transparent"
        >
          UI/UX Design
        </Button>
      }
      open={open}
      className={"left-[unset] right-0"}
      onClose={() => setOpen(false)}
    >
      <div className="flex items-center justify-between border-b border-default-300 bg-default-50 px-3 py-2">
        <div className="text-sm font-medium text-default-900">Task List </div>
        <Button
          type="button"
          size="icon"
          className="h-6 w-6 rounded-full bg-default-400"
          onClick={togglePopover}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-2">
        <Command>
          <CommandInput
            placeholder="Search list..."
            inputWrapper="border border-default-200 rounded-md"
            className="h-9"
          ></CommandInput>
          <CommandEmpty>No Item found</CommandEmpty>
          <CommandGroup>
            {list.map((item, index) => (
              <CommandItem key={`assigned-list-item-${index}`}>
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer border-b border-default-200 px-4 py-1.5 text-sm font-medium text-default-600 hover:bg-default-50 hover:underline hover:decoration-primary">
            Create a list
          </div>
        </DialogTrigger>
        <DialogContent size="lg" className="px-0">
          <DialogHeader className="border-b border-default-300">
            <div className="pb-4 text-center text-lg font-medium text-default-900">
              Create a list
            </div>
          </DialogHeader>

          <div className="p-4">
            <Label htmlFor="listname" className="mb-2">
              List Name
            </Label>
            <Input type="text" placeholder="example list.." />
          </div>
          <DialogFooter className="px-4 sm:justify-center">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CustomPopover>
  );
};

export default AssignList;
