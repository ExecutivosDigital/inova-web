"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@iconify/react";

const SubTaskHeader = () => {
  return (
    <form className="border-b border-default-200 px-6 py-5 pb-8">
      <div className="mb-2 flex items-center gap-1">
        <div className="mt-1">
          <Checkbox className="h-4 w-4" color="secondary" />
        </div>
        <input
          type="text"
          defaultValue="Project Title"
          className="h-7 w-full rounded-sm px-1 text-sm font-medium text-default-900 focus:border focus:border-default-200 focus:bg-default-50 focus:outline-none"
        />
      </div>

      <div className="relative flex gap-1">
        <div className="mt-1">
          <Icon
            icon="heroicons:information-circle"
            className="h-5 w-5 text-default-900"
          />
        </div>
        <textarea
          className="peer h-16 w-full border-none p-1 text-sm text-default-700 focus:border-none focus:outline-none"
          placeholder="Add Task Descriptions"
          rows={1}
        />
        <Button className="h-6 py-0 text-xs" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default SubTaskHeader;
