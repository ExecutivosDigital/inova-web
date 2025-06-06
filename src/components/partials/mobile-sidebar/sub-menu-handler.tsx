"use client";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

const SubMenuHandler = ({
  item,
  toggleSubmenu,
  index,
  activeSubmenu,
  collapsed,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toggleSubmenu: any;
  index: number;
  activeSubmenu: number | null;
  collapsed: boolean;
}) => {
  const { title } = item;

  return (
    <>
      {collapsed ? (
        <div className="data-[state=open]:bg-primary-100 data-[state=open]:text-primary inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-md">
          <item.icon className="h-6 w-6" />
        </div>
      ) : (
        <div
          onClick={() => toggleSubmenu(index)}
          className={cn(
            "group text-default-700 hover:bg-primary hover:text-primary flex cursor-pointer rounded px-[10px] py-3 text-sm font-medium capitalize transition-all duration-100",
            {
              "bg-primary text-primary": activeSubmenu === index,
            },
          )}
        >
          <div className="flex flex-1 items-start gap-3">
            <span className="inline-flex items-center text-lg">
              <item.icon className="h-5 w-5" />
            </span>
            <div className=" ">{title}</div>
          </div>
          <div className="flex-0">
            <div
              className={cn(
                "group-hover:text-primary flex items-center justify-center rounded-full text-base transition-all duration-300",
                {
                  "rotate-90": activeSubmenu === index,
                  "text-default-500": activeSubmenu !== index,
                },
              )}
            >
              <Icon
                icon="heroicons:chevron-right-20-solid"
                className="h-5 w-5"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubMenuHandler;
