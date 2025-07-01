"use client";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import EquipmentMediaSheet from "./EquipmentMediaSheet";

export function Gallery() {
  const [equipmentPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openEquipmentMediaSheet, setOpenEquipmentMediaSheet] =
    useState<boolean>(false);

  return (
    <>
      <div className="border-primary w-full overflow-hidden rounded-2xl border">
        <div className="flex w-full items-center justify-between p-2 xl:p-4">
          <span className="text-primary text-sm font-semibold xl:text-xl">
            Fotografias e Afins
          </span>
          <Image
            src="/logo/logo.png"
            alt=""
            width={500}
            height={250}
            className="h-10 w-max object-contain"
          />
        </div>
        <div className="flex h-96 w-full flex-col">
          <ScrollArea className="h-80 w-full">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                onClick={() => setOpenEquipmentMediaSheet(true)}
                className="hover:bg-primary/20 group flex w-full cursor-pointer items-center justify-between border-b px-2 py-1 transition duration-200 xl:px-4 xl:py-2"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-primary/20 h-10 min-h-10 w-10 min-w-10 rounded-md" />
                  <div className="flex flex-col text-xs xl:text-sm">
                    <span>Lorem Ipsum is simply dummy text</span>
                    <span>{new Date().toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
                <div className="group-hover:text-primary flex w-max items-center gap-1 text-zinc-500">
                  <span className="w-max text-xs font-semibold transition duration-200 group-hover:underline xl:text-sm">
                    Acesse Aqui
                  </span>
                  <ChevronRight className="w-4" />
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex h-16 w-full items-center justify-center">
            <CustomPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pages={equipmentPages}
            />
          </div>
        </div>
      </div>
      {openEquipmentMediaSheet && (
        <EquipmentMediaSheet
          open={openEquipmentMediaSheet}
          onClose={() => setOpenEquipmentMediaSheet(false)}
        />
      )}
    </>
  );
}
