"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CustomPopover } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const tabs = [
  {
    label: "Due Date",
    value: "due-date",
  },
  {
    label: "Start Date",
    value: "start-date",
  },
];
const TaskDate = () => {
  const [open, setOpen] = useState<boolean>(false);
  const togglePopover = () => setOpen(!open);
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  return (
    <CustomPopover
      trigger={
        <Button
          type="button"
          className="bg-transparent p-0 text-start hover:bg-transparent"
          onClick={togglePopover}
        >
          <span className="text-default-500 text-sm font-medium whitespace-normal">
            Due: 30 Feb, 2024 / 5:23AM
          </span>
        </Button>
      }
      open={open}
      onClose={() => setOpen(false)}
      className="left-2 w-[300px]"
    >
      <Tabs defaultValue="due-date" className="block">
        <TabsList className="grid h-12 w-full grid-cols-2 py-2">
          {tabs.map((item) => (
            <TabsTrigger key={`date-item-${item.value}`} value={item.value}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="due-date">
          <Calendar
            mode="single"
            selected={dueDate}
            onSelect={(date) => setDueDate(date as Date)}
            className="w-full"
          />
        </TabsContent>
        <TabsContent value="start-date">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={(date) => setStartDate(date as Date)}
            className="w-full"
          />
        </TabsContent>
      </Tabs>
      <div className="flex justify-end gap-2 p-2.5">
        <Button size="sm" variant="outline" onClick={togglePopover}>
          Cancel
        </Button>
        <Button size="sm">Select</Button>
      </div>
    </CustomPopover>
  );
};

export default TaskDate;
