"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// avatar

import { Button } from "@/components/ui/button";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { equipments } from "@/mock/equipments";
import { Eye, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NewEquipmentModal } from "./NewEquipmentModal";

export function EquipmentList() {
  const router = useRouter();
  const columns = [
    { key: "name", label: "Nome" },
    { key: "tag", label: "TAG" },
    { key: "consumption", label: "Consumo" },
    { key: "last", label: "Último Serviço" },
    { key: "programmed", label: "Data Programada" },
    { key: "executed", label: "Data Executada" },
    { key: "actions", label: "Ações" },
  ];

  const [equipmentPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openNewEquipmentModal, setOpenNewEquipmentModal] =
    useState<boolean>(false);

  return (
    <>
      <Card className="h-full overflow-hidden">
        <CardHeader className="mb-0 flex-row items-center justify-between">
          <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row">
            <span className="text-primary text-2xl font-bold">
              Lista de Materiais
            </span>
            <label
              htmlFor="search"
              className="group focus-within:border-primary active:border-primary flex h-10 w-[300px] flex-row items-center gap-1 rounded-lg border border-zinc-400 p-0.5 transition duration-200"
            >
              <Search className="group-focus-within:text-primary h-4 w-4 text-zinc-400 transition duration-200" />
              <input
                id="search"
                className="flex-w group-focus-within:placeholder:text-primary/20 group-focus-within:text-primary h-full w-full bg-transparent text-zinc-400 transition duration-200 outline-none placeholder:text-zinc-400"
                placeholder="Procurar"
              />
            </label>
            <Button
              onClick={() => setOpenNewEquipmentModal(true)}
              className="m-0 text-white lg:h-max lg:px-2 lg:py-1 lg:text-xs xl:h-9 xl:px-3 xl:py-2 xl:text-sm"
            >
              <Plus className="h-4 w-4 text-white ltr:mr-1 rtl:ml-1" />
              Novo Material
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto px-0 pb-0">
          <Table>
            <TableHeader className="bg-primary">
              <TableRow className="border-primary gap-[1px]">
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className="h-12 flex-row text-end text-sm font-semibold text-white uppercase last:text-start"
                  >
                    <p className="text-center">{column.label}</p>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipments.map((equipment) => (
                <TableRow
                  key={equipment.id}
                  onClick={() => router.push(`/equipments/${equipment.id}`)}
                  className="hover:bg-primary/10 cursor-pointer text-center transition duration-200"
                >
                  <TableCell className="text-primary py-0.5 text-sm font-medium whitespace-nowrap">
                    {equipment.name}
                  </TableCell>
                  <TableCell className="text-primary py-0.5 text-sm font-medium whitespace-nowrap">
                    {equipment.tag}
                  </TableCell>
                  <TableCell className="text-primary py-0.5 text-sm font-medium whitespace-nowrap">
                    {equipment.consumption}
                  </TableCell>
                  <TableCell className="text-primary py-0.5 text-sm font-medium whitespace-nowrap">
                    {equipment.last}
                  </TableCell>
                  <TableCell className="text-primary py-0.5 text-sm font-medium whitespace-nowrap">
                    {equipment.programmed}
                  </TableCell>
                  <TableCell className="text-primary py-0.5 text-sm font-medium whitespace-nowrap">
                    {equipment.executed}
                  </TableCell>
                  <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap text-white">
                    <div className="bg-primary mx-auto w-max rounded-md p-1">
                      <Eye />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="mt-4 flex-none">
          <CustomPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={equipmentPages}
          />
        </CardFooter>
      </Card>
      {openNewEquipmentModal && (
        <NewEquipmentModal
          isOpen={openNewEquipmentModal}
          close={() => setOpenNewEquipmentModal(false)}
        />
      )}
    </>
  );
}
