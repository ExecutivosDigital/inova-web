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
import { cn } from "@/lib/utils";
import { planningList } from "@/mock/planning";
import { Eye, Info, Plus } from "lucide-react";
import { useState } from "react";
import { NewRouteProgramSheet } from "./NewRouteProgramSheet";
import { RouteProgramSheet } from "./RouteProgramSheet";

export function ProgrammingTable() {
  const columns = [
    { key: "os", label: "Rota" },
    { key: "amount", label: "QNT. OS" },
    { key: "startDate", label: "Data Inicial" },
    { key: "worker", label: "Responsável" },
    { key: "eqp", label: "Equipamento" },
    { key: "status", label: "Status" },
    { key: "action", label: "" },
  ];

  const [planningPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [openRouteProgramSheet, setOpenRouteProgramSheet] =
    useState<boolean>(false);
  const [openNewRouteProgramSheet, setOpenNewRouteProgramSheet] =
    useState<boolean>(false);

  return (
    <>
      <div className="flex w-full flex-col gap-4 rounded-md bg-white p-4 shadow-sm">
        <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row">
          <span className="text-primary text-xl font-bold 2xl:text-2xl">
            Plano de Lubrificação
          </span>
          <div className="bg-primary/50 flex items-center gap-4 rounded-md px-2 py-1">
            <div
              onClick={() => setSelectedFilter("Todos")}
              className={cn(
                "h-full w-max cursor-pointer rounded-md px-2 py-1 text-xs font-semibold text-white transition duration-200",
                selectedFilter === "Todos" && "bg-primary",
              )}
            >
              Todos
            </div>
            <div
              onClick={() => setSelectedFilter("Normal")}
              className={cn(
                "h-full w-max cursor-pointer rounded-md px-2 py-1 text-xs font-semibold text-white transition duration-200",
                selectedFilter === "Normal" && "bg-primary",
              )}
            >
              Normal
            </div>
            <div
              onClick={() => setSelectedFilter("Baixo")}
              className={cn(
                "h-full w-max cursor-pointer rounded-md px-2 py-1 text-xs font-semibold text-white transition duration-200",
                selectedFilter === "Baixo" && "bg-primary",
              )}
            >
              Baixo
            </div>
          </div>
          <button
            onClick={() => setOpenNewRouteProgramSheet(true)}
            className="bg-primary hover:bg-primary-dark flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 font-semibold text-white transition duration-200"
          >
            <Plus />
            <span>Novo Planejamento de Rota</span>
          </button>
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
            {planningList.map((plan) => (
              <TableRow
                key={plan.id}
                onClick={() => setOpenRouteProgramSheet(true)}
                className="hover:bg-primary/10 h-10 max-h-10 cursor-pointer text-center transition duration-200"
              >
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  {plan.os}
                </TableCell>
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  {plan.amount}
                </TableCell>
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  {plan.startDate}
                </TableCell>
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  {plan.worker}
                </TableCell>
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  {plan.eqp}
                </TableCell>
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap">
                  <Info
                    className={cn(
                      "mx-auto",
                      plan.status === "finished"
                        ? "text-green-500"
                        : "text-amber-500",
                    )}
                  />
                </TableCell>
                <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap text-white">
                  <div className="bg-primary hover:bg-primary-dark mx-auto w-max cursor-pointer rounded-md p-1 transition duration-200">
                    <Eye />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CustomPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={planningPages}
        />
      </div>
      {openRouteProgramSheet && (
        <RouteProgramSheet
          open={openRouteProgramSheet}
          onClose={() => setOpenRouteProgramSheet(false)}
        />
      )}
      {openNewRouteProgramSheet && (
        <NewRouteProgramSheet
          open={openNewRouteProgramSheet}
          onClose={() => setOpenNewRouteProgramSheet(false)}
        />
      )}
    </>
  );
}
