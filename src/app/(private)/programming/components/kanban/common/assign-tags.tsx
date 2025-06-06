import { activityTaskType } from "@/@staticData/activities/tasks";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { CustomPopover } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, Plus, X } from "lucide-react";
import React, { useState } from "react";

const newtags = [
  {
    value: "design",
    label: "Design",
  },
  {
    value: "development",
    label: "Development",
  },
  {
    value: "planning",
    label: "Planning",
  },
  {
    value: "ui/ux",
    label: "UI/UX",
  },
];
const tagsColorMap: { [key: string]: string } = {
  development: "destructive",
  planning: "info",
  design: "success",
};
const themeColors = ["primary", "success", "info", "warning", "destructive"];

const AssignTags = ({ task }: { task: activityTaskType }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState(task?.tags || []);
  const [openTagColor, setOpenTagColor] = useState(false);

  const [newTagName, setNewTagName] = useState("");

  const [newTagColor, setNewTagColor] = useState("primary");

  const toggleOpenTagColor = () => setOpenTagColor(!openTagColor);

  const handlePopover = () => {
    setOpen(true);
  };
  const closePopover = () => {
    setOpen(false);
    setOpenTagColor(false);
  };
  const handleSelect = async (value: string) => {
    const index = selectedValues.indexOf(value);
    let updatedValues;

    if (index === -1) {
      updatedValues = [...selectedValues, value];
    } else {
      updatedValues = [...selectedValues];
      updatedValues.splice(index, 1);
    }

    setSelectedValues(updatedValues);
  };

  const handleTagSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTag = {
      value: newTagName.toLowerCase(),
      label: newTagName,
    };

    const updatedValues = [...selectedValues, newTag.value];
    setSelectedValues(updatedValues);

    closePopover();
    setNewTagName("");
  };

  return (
    <>
      <CustomPopover
        trigger={
          <div className="flex items-center gap-1">
            <div className="text-default-900 text-sm font-medium">Add Tags</div>
            <Button
              onClick={handlePopover}
              className="bg-default-100 hover:bg-default-200 h-5 w-5 rounded-full"
              size="icon"
            >
              <Plus className="text-primary h-3 w-3" />
            </Button>
          </div>
        }
        open={open}
        onClose={closePopover}
      >
        {openTagColor ? (
          <div>
            <div className="border-default-100 bg-default-50 flex items-center justify-between border-b px-2 py-1">
              <div className="text-default-900 text-sm font-medium">
                Create a new tag
              </div>
              <Button
                type="button"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={closePopover}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-2">
              <form onSubmit={handleTagSubmission}>
                <div>
                  <Input
                    type="text"
                    placeholder="type a name"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                  />
                </div>
                <div className="text-default-700 my-2 text-sm font-medium">
                  Select Color
                </div>
                <div className="flex flex-wrap gap-4">
                  {themeColors.map((item, index) => (
                    <label
                      key={index}
                      htmlFor={item}
                      className={`flex h-10 w-10 cursor-pointer flex-wrap items-center justify-center rounded p-0 bg-${item}`}
                    >
                      {newTagColor === item && (
                        <Check className="text-primary-foreground h-5 w-5" />
                      )}
                      <input
                        type="radio"
                        value={item}
                        id={item}
                        className="hidden"
                        checked={newTagColor === item}
                        onChange={() => setNewTagColor(item)}
                      />
                    </label>
                  ))}
                </div>
                <div className="mt-4 flex gap-4">
                  <Button variant="soft" type="button" onClick={closePopover}>
                    Cancel
                  </Button>
                  <Button>Save</Button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <>
            <Command className="p-0">
              <CommandInput placeholder="Search..." />
              <CommandEmpty>No newtag found.</CommandEmpty>
              <CommandGroup>
                {newtags.map((newtag) => (
                  <CommandItem
                    key={newtag.value}
                    value={newtag.value}
                    onSelect={() => handleSelect(newtag.value)}
                    className={cn(
                      "bg-primary text-primary-foreground aria-selected:text-primary-foreground mb-1",
                      {
                        "bg-destructive aria-selected:bg-destructive":
                          newtag.value === "development",
                        "bg-info aria-selected:bg-info":
                          newtag.value === "planning",
                        "bg-success aria-selected:bg-success":
                          newtag.value === "design",
                        "bg-warning aria-selected:bg-warning":
                          newtag.value === "ui/ux",
                      },
                    )}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValues.includes(newtag.value)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {newtag.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>

            <div
              className="cursor-pointer py-2 pl-8"
              onClick={(e) => {
                e.stopPropagation(); // Stop the event from propagating to the outer div
                toggleOpenTagColor();
              }}
            >
              Create a new tag
            </div>
          </>
        )}
      </CustomPopover>
      <div className="mt-3 flex gap-2">
        {selectedValues?.map((tag, index) => (
          <Badge
            color={tagsColorMap[tag] as BadgeProps["color"]}
            className="capitalize"
            key={`badge-tag-key-index-${index}`}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </>
  );
};

export default AssignTags;
