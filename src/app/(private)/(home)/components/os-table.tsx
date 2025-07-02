"use client";
import { DashboardOsProps } from "@/@types/dashboard";
import { CustomPagination } from "@/components/ui/custom-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { dashboardOs } from "@/mock/dashboard";
import { Info, Search } from "lucide-react";
import { useState } from "react";
import { OsSheet } from "./os-sheet";

export function OsTable() {
  const columns = [
    { key: "worker", label: "Responsável" },
    { key: "service", label: "Serviço" },
    { key: "key", label: "OS" },
    { key: "executed", label: "Data Executada" },
    { key: "spent", label: "Tempo de Conclusão" },
  ];
  const [osPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedOs, setSelectedOs] = useState<DashboardOsProps | null>(null);
  const [openOsSheet, setOpenOsSheet] = useState<boolean>(false);

  return (
    <>
      <div className="flex w-full flex-col gap-4 rounded-md shadow-sm xl:col-span-7 xl:h-[700px]">
        <div className="flex w-full flex-col items-center justify-between gap-2 p-4 lg:flex-row">
          <span className="text-primary text-2xl font-bold">
            Ordens de Serviços - Rotas de Trabalho
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
            {dashboardOs.map((os) => (
              <TableRow
                key={os.id}
                onClick={() => {
                  setSelectedOs(os);
                  setOpenOsSheet(true);
                }}
                className="hover:bg-primary/10 h-10 max-h-10 cursor-pointer text-center transition duration-200"
              >
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  {os.worker}
                </TableCell>
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  {os.service}
                </TableCell>
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  {os.os}
                </TableCell>
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  {os.executed}
                </TableCell>
                <TableCell className="m-auto flex h-full w-max items-center gap-1 py-2 text-sm font-medium whitespace-nowrap">
                  {os.spent}
                  <Info
                    className={cn(
                      "mx-auto",
                      os.status === "finished"
                        ? "text-green-500"
                        : "text-amber-500",
                    )}
                  />
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
      {selectedOs && (
        <OsSheet
          open={openOsSheet}
          onClose={() => setOpenOsSheet(false)}
          selectedOs={selectedOs}
        />
      )}
    </>
  );
}
