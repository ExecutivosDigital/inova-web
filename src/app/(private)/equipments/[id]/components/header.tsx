"use client";
import { EquipmentsProps } from "@/@types/equipments";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronLeft, Edit, LayersIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  selectedEquipment: EquipmentsProps;
}

export function Header({ selectedEquipment }: HeaderProps) {
  const router = useRouter();

  return (
    <>
      <div className="flex h-40 w-full items-center justify-center bg-[url('/static/materials-header.png')] bg-cover bg-center bg-no-repeat">
        <div className="flex items-center gap-2 text-white">
          <LayersIcon />
          <span className="text-xl font-bold 2xl:text-2xl">
            EQUIPAMENTOS E DADOS
          </span>
        </div>
      </div>
      <div className="flex w-full items-center justify-between p-2 xl:p-4">
        <div className="text-primary flex items-center gap-2">
          <ChevronLeft
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <span className="font-bold xl:text-xl">{selectedEquipment.name}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-max gap-2 p-2 text-white">
              <Edit className="h-4" />{" "}
              <span className="hidden xl:block">Ações</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="left">
            <DropdownMenuItem>
              <span>Criar OS</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Editar Equipamento</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Excluir Equipamento</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
