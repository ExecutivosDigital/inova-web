"use client";
import { DashboardEquipmentProps } from "@/@types/dashboard";
import { CustomPagination } from "@/components/ui/custom-pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { dashboardEquipments } from "@/mock/dashboard";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { Info, Search } from "lucide-react";
import { useState } from "react";
import { EquipmentSheet } from "./equipment-sheet";

export function OsEquipments() {
  const columns = [
    { key: "os", label: "" },
    { key: "eqp", label: "Equipamento" },
    { key: "tag", label: "TAG" },
    { key: "service", label: "Serviço" },
    { key: "worker", label: "Responsável" },
    { key: "consumption", label: "Consumo" },
    { key: "date", label: "Data de Execução" },
    { key: "status", label: "Status" },
    { key: "place", label: "Local" },
  ];
  const [osPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openEquipmentSheet, setOpenEquipmentSheet] = useState<boolean>(false);
  const [selectedEquipment, setSelectedEquipment] =
    useState<DashboardEquipmentProps | null>(null);

  return (
    <>
      <div className="flex w-full flex-col gap-4 rounded-md shadow-sm xl:h-[700px]">
        <div className="flex w-full flex-col items-center justify-between gap-2 p-4 lg:flex-row">
          <span className="text-primary text-2xl font-bold">
            Equipamentos das Rotas Programadas
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
        </div>
        <Table>
          <TableHeader className="bg-primary/20">
            <TableRow className="border-primary/20 gap-[1px]">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className="text-primary h-12 flex-row text-end text-sm font-semibold uppercase last:text-start"
                >
                  <p className="text-center">{column.label}</p>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dashboardEquipments.map((equipment) => (
              <TableRow
                key={equipment.id}
                onClick={() => {
                  setSelectedEquipment(equipment);
                  setOpenEquipmentSheet(true);
                }}
                className="hover:bg-primary/10 h-10 max-h-10 cursor-pointer text-center transition duration-200"
              >
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap" />
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  {equipment.eqp}
                </TableCell>
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  {equipment.tag}
                </TableCell>
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  {equipment.service}
                </TableCell>
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  {equipment.worker}
                </TableCell>
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  {equipment.consumption}
                </TableCell>
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  {equipment.date}
                </TableCell>
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  <Info
                    className={cn(
                      "mx-auto",
                      equipment.status === "finished"
                        ? "text-green-500"
                        : "text-amber-500",
                    )}
                  />
                </TableCell>
                <TableCell className="flex items-center justify-center py-0.5 text-sm font-bold whitespace-nowrap">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className="bg-primary/20 text-primary flex h-10 w-10 items-center justify-center rounded-md p-1 text-center">
                        {equipment.placeCode}
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="left"
                      className="border-primary/20 max-w-40"
                    >
                      <DropdownMenuArrow />
                      <p className="text-center text-xs">{equipment.place}</p>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex h-16 w-full items-center justify-center">
          <CustomPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={osPages}
          />
        </div>
      </div>
      {selectedEquipment && (
        <EquipmentSheet
          open={openEquipmentSheet}
          onClose={() => setOpenEquipmentSheet(false)}
          selectedEquipment={selectedEquipment}
        />
      )}
    </>
  );
}
