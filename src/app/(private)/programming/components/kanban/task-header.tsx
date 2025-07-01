"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

interface TaskHeaderProps {
  openCreateBoard: () => void;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}
const TaskHeader = ({
  openCreateBoard,
  inputText,
  setInputText,
}: TaskHeaderProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {/* search task */}
        <div className="relative min-w-[240px]">
          <span className="absolute top-1/2 -translate-y-1/2 ltr:left-2 rtl:right-2">
            <Search className="text-default-500 h-4 w-4" />
          </span>
          <Input
            type="text"
            placeholder="Pesquisar "
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="ltr:pl-7 rtl:pr-7"
            size="lg"
          />
        </div>
      </div>
      <div className="flex flex-none items-center gap-4">
        <Button className="text-white" onClick={openCreateBoard}>
          <Plus className="h-4 w-4 ltr:mr-1 rtl:ml-1" /> Nova Programação de
          Rota
        </Button>
      </div>
    </div>
  );
};

export default TaskHeader;
