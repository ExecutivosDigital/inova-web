"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// avatar

import { CustomPagination } from "@/components/ui/custom-pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { materialOs } from "@/mock/materials";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { Info, Search } from "lucide-react";
import { useState } from "react";

const OsTable = () => {
  const columns = [
    { key: "os", label: "" },
    { key: "eqp", label: "Equipamento" },
    { key: "service", label: "Serviço" },
    { key: "worker", label: "Responsável" },
    { key: "consumption", label: "Consumo" },
    { key: "date", label: "Data de Execução" },
    { key: "status", label: "Status" },
    { key: "place", label: "Local" },
  ];

  const [materialPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row">
        <span className="text-primary text-2xl font-bold">
          Histórico de Ordens de Serviço
        </span>
        <div className="flex h-10 w-[300px] flex-row items-center gap-1 rounded-lg border border-zinc-400 p-0.5">
          <Search className="h-4 w-4 text-zinc-400" />
          <input
            className="flex-w h-full w-full bg-transparent text-zinc-400 outline-none placeholder:text-zinc-400"
            placeholder="Procurar"
          />
        </div>
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
          {materialOs.map((material) => (
            <TableRow
              key={material.id}
              className="hover:bg-primary/10 h-10 max-h-10 text-center transition duration-200"
            >
              <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap" />
              <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                {material.eqp}
              </TableCell>
              <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                {material.service}
              </TableCell>
              <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                {material.worker}
              </TableCell>
              <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                {material.consumption}
              </TableCell>
              <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                {material.date}
              </TableCell>
              <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                <Info
                  className={cn(
                    "mx-auto",
                    material.status === "finished"
                      ? "text-green-500"
                      : "text-amber-500",
                  )}
                />
              </TableCell>
              <TableCell className="py-0.5 text-sm font-bold whitespace-nowrap">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="bg-primary/20 text-primary mx-auto flex h-10 w-10 items-center justify-center rounded-md p-1 text-center">
                      {material.placeCode}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="left"
                    className="border-primary/20 max-w-40"
                  >
                    <DropdownMenuArrow />
                    <p className="text-center text-xs">{material.place}</p>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={materialPages}
      />
    </div>
  );
};

export default OsTable;
