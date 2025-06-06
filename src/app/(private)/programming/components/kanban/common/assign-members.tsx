"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CustomPopover } from "@/components/ui/popover";
import { faker } from "@faker-js/faker";
import { UserPlus, X } from "lucide-react";
import { useState } from "react";
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
const AssignMembers = ({ icon }: { icon?: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const togglePopover = () => setOpen(!open);

  return (
    <CustomPopover
      trigger={
        <button
          className="bg-default-100 grid h-5 w-5 place-content-center rounded-full"
          onClick={togglePopover}
        >
          {icon ? icon : <UserPlus className="text-primary h-3 w-3" />}
        </button>
      }
      open={open}
      onClose={() => setOpen(false)}
    >
      <div className="border-default-300 bg-default-50 flex items-center justify-between border-b px-3 py-2">
        <div className="text-default-900 text-sm font-medium">
          Assign Task To
        </div>
        <Button
          type="button"
          size="icon"
          className="bg-default-400 h-6 w-6 rounded-full"
          onClick={togglePopover}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-2">
        <Command>
          <CommandInput
            placeholder="Search By Name..."
            inputWrapper="border border-default-200 rounded-md"
            className="h-9"
          ></CommandInput>
          <CommandEmpty>No new members.</CommandEmpty>
          <CommandGroup>
            {members.map((item) => (
              <CommandItem
                key={`assigned-members-${item.value}`}
                value={item.name}
                className="gap-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={item.image} />
                  <AvatarFallback>SN</AvatarFallback>
                </Avatar>
                <span className="font-base text-default-900 capitalize">
                  {item.name}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </div>
    </CustomPopover>
  );
};

export default AssignMembers;
