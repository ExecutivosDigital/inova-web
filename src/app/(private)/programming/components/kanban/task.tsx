"use client";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// dnd
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Proposal } from "./DndKitGuide";

interface TaskProps {
  client: Proposal;
  setOpenEditSheet?: (value: Proposal) => void;
  setSelectedClientId?: React.Dispatch<React.SetStateAction<string | null>>;
}

const Task = ({ client, setOpenEditSheet }: TaskProps) => {
  // dnd
  const { listeners, transform, transition, isDragging } = useSortable({
    id: client.id,
    data: {
      type: "item",
    },
  });

  return (
    <>
      <Card
        {...listeners}
        style={{
          transition,
          transform: CSS.Translate.toString(transform),
        }}
        onClick={() => setOpenEditSheet && setOpenEditSheet({ ...client })}
        className={cn(
          "group border-default-300 bg-default-100 relative cursor-pointer p-2 shadow",
          {
            "opacity-50": isDragging,
          },
        )}
      >
        <CardContent className="p-0">
          <div className="relative">
            <div className="text-default-700 my-1 text-sm font-semibold capitalize">
              {client.name}
            </div>
          </div>
          {/* 
          <div className="mb-1 flex flex-col">
            <div className="flex flex-row items-center gap-1 whitespace-pre-line text-[13px] text-default-500">
              <MapPin className="h-4 w-4" />
              <span>
                {client.city} - {client.state}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <div className="flex flex-row items-center gap-1 whitespace-pre-line text-[13px] text-default-500">
                <Phone className="h-4 w-4" />
                <span>{client.phone}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `https://wa.me/${phoneNumberRegex(client.phone)}`,
                    "_blank",
                  );
                }}
                className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary"
              >
                <Icon
                  icon="ant-design:whats-app-outlined"
                  className="h-4 w-4"
                />
              </button>
            </div>
          </div>
          <div className="mt-1 whitespace-pre-line text-[13px] text-default-500">
            Igreja: {client.churchName}
          </div>
          <div className="mt-1 whitespace-pre-line text-[13px] text-default-500">
            Capacidade: {client.capacity}
          </div> */}
        </CardContent>
        {/* <CardFooter className="mt-2 flex flex-col gap-2 border-t border-t-zinc-400/10 p-0 py-1">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1"></div>
            <div className="flex items-center gap-1 text-xs text-default-400">
              <Calendar className="h-3 w-3" />
              <span>
                {new Date(client.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>
        </CardFooter> */}
      </Card>
    </>
  );
};

export default Task;
