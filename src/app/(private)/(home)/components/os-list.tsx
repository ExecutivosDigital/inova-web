"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CheckCheck, ChevronRight, Info } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function OsList() {
  const [selectedList, setSelectedList] = useState<string>("Concluídas");

  return (
    <div className="w-full overflow-hidden rounded-md shadow-sm xl:col-span-5 xl:h-[700px]">
      <div className="flex w-full items-center justify-between p-2 xl:p-4">
        <span className="text-primary text-sm font-semibold xl:text-xl">
          Ordens {selectedList}
        </span>
        <Image
          src="/logo/logo.png"
          alt=""
          width={500}
          height={250}
          className="h-10 w-max object-contain"
        />
      </div>
      <div className="flex h-[calc(100%-80px)] w-full flex-col">
        <ScrollArea className="h-full w-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="flex w-full items-center justify-between gap-2 border-b px-2 py-1 xl:px-4 xl:py-2"
            >
              <div className="flex items-center gap-2">
                <div className="bg-primary/20 h-10 min-h-10 w-10 min-w-10 rounded-md" />
                <div className="flex flex-col text-xs xl:text-sm">
                  <span>Lorem Ipsum is simply dummy text</span>
                  <span>{new Date().toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
              <div className="flex w-max items-center gap-1 text-zinc-500">
                <span className="w-max text-xs font-semibold xl:text-sm">
                  Acesse Aqui
                </span>
                <ChevronRight className="w-4" />
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="flex h-16 w-full items-center justify-center gap-2 px-2 xl:gap-4">
          <button
            onClick={() => setSelectedList("Ver Todas")}
            className={cn(
              "border-primary text-primary xl:x-4 flex h-12 cursor-pointer items-center gap-2 rounded-md border px-2 py-1 text-xs transition duration-200 xl:py-2 xl:text-sm",
              selectedList === "Ver Todas" && "bg-primary font-bold text-white",
            )}
          >
            <span>Ver Todas</span>
            <ChevronRight className="w-4 xl:w-6" />
          </button>
          <button
            onClick={() => setSelectedList("Com Atraso")}
            className={cn(
              "border-primary text-primary xl:x-4 flex h-12 cursor-pointer items-center gap-2 rounded-md border px-2 py-1 text-xs transition duration-200 xl:py-2 xl:text-sm",
              selectedList === "Com Atraso" &&
                "bg-primary font-bold text-white",
            )}
          >
            <span>Com Atraso</span>
            <Info className="w-4 xl:w-6" />
          </button>
          <button
            onClick={() => setSelectedList("Concluídas")}
            className={cn(
              "border-primary text-primary xl:x-4 flex h-12 cursor-pointer items-center gap-2 rounded-md border px-2 py-1 text-xs transition duration-200 xl:py-2 xl:text-sm",
              selectedList === "Concluídas" &&
                "bg-primary font-bold text-white",
            )}
          >
            <span>Concluídas</span>
            <CheckCheck className="w-4 xl:w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
