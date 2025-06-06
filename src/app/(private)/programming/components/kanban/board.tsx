"use client";
import React, { useEffect, useRef, useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// dnd
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Boards } from "./DndKitGuide";
interface TaskBoardProps {
  // board: activityBoardType;
  board: Boards;
  children?: React.ReactNode;
}
const Board = ({ board, children }: TaskBoardProps) => {
  const lastScrollTop = useRef(0);
  const chatHeightRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (board.pages > currentPage) {
      const chatElement = chatHeightRef.current as HTMLDivElement;
      const handleScroll = async () => {
        const scrollTop = chatElement.scrollTop;
        const scrollHeight = chatElement.scrollHeight;
        const clientHeight = chatElement.clientHeight;

        // Se o usuário fez scroll para baixo e chegou ao final da página
        if (
          Math.abs(scrollTop + clientHeight - scrollHeight) <= 100 &&
          board.pages > currentPage
        ) {
          // setIsAutoScrollEnabled(true);
          setCurrentPage(currentPage + 1);
          // return await GetClientsByBoard(
          //   board.id,
          //   (currentPage + 1).toString(),
          // );
        }

        lastScrollTop.current = scrollTop;
      };

      if (chatElement) {
        chatElement.addEventListener("scroll", handleScroll);
      }

      return () => {
        if (chatElement) {
          chatElement.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, [chatHeightRef.current, currentPage]);

  const { attributes, setNodeRef, transform, transition } = useSortable({
    id: board.id,
    data: {
      type: "container",
    },
  });

  return (
    <>
      <Card
        ref={setNodeRef}
        style={{
          transition,
          transform: CSS.Translate.toString(transform),
          borderColor: board.color,
        }}
        {...attributes}
        className={cn(
          "bg-default-50 w-full max-w-[277px] flex-none rounded-md border-t-4 shadow-lg",
        )}
      >
        <CardHeader className="border-default-200 mb-0 flex-row items-center justify-center space-y-0 rounded-sm border-b px-3 py-2.5">
          <div className="text-default-800 text-sm font-semibold capitalize">
            {board.name}
          </div>
        </CardHeader>
        {/* main content  */}
        <CardContent className="px-0 pb-0">
          {/* all tasks */}
          <div
            ref={chatHeightRef}
            className="h-[calc(100vh-300px)] space-y-3 overflow-y-auto p-3"
          >
            {children}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Board;
