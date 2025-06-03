"use client";
import { MaterialProps } from "@/@types/materials";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Edit, LayersIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  selectedMaterial: MaterialProps;
}

export function Header({ selectedMaterial }: HeaderProps) {
  const router = useRouter();

  return (
    <>
      <div className="flex h-40 w-full items-center justify-center bg-[url('/static/materials-header.png')] bg-cover bg-center bg-no-repeat">
        <div className="flex items-center gap-2 text-white">
          <LayersIcon />
          <span className="text-2xl font-bold">MATERIAIS</span>
        </div>
      </div>
      <div className="flex w-full items-center justify-between p-2 xl:p-4">
        <div className="text-primary flex items-center gap-2">
          <ChevronLeft
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <span className="font-bold xl:text-xl">{selectedMaterial.name}</span>
        </div>
        <Button className="h-max gap-2 p-1 text-white">
          <Edit className="h-4" />{" "}
          <span className="hidden xl:block">Editar Material</span>
        </Button>
      </div>
    </>
  );
}
