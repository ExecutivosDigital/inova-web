"use client";
import { CustomPagination } from "@/components/ui/custom-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { planningList } from "@/mock/planning";
import { Eye, Plus, Search } from "lucide-react";
import { useState } from "react";
import { NewOsPlanSheet } from "./NewOsPlanSheet";
import { OsPlanSheet } from "./OsPlanSheet";

export function PlanningTable() {
  const columns = [
    { key: "id", label: "ID" },
    { key: "area", label: "ÁREA" },
    { key: "service", label: "SERVIÇO" },
    { key: "eqp", label: "EQUIPAMENTO" },
    { key: "worker", label: "RESPONSÁVEL" },
    { key: "startDate", label: "Data INICIAL" },
    { key: "endDate", label: "DATA TÉRMINO" },
    { key: "action", label: "" },
  ];

  const [planningPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [newRouteOsSheetOpen, setNewRouteOsSheetOpen] = useState(false);
  const [openOsPlanSheet, setOpenOsPlanSheet] = useState<boolean>(false);

  return (
    <>
      <div className="flex w-full flex-col gap-4 rounded-md bg-white p-4 shadow-sm">
        <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row">
          <span className="text-primary text-xl font-bold 2xl:text-2xl">
            Plano de Lubrificação
          </span>
          <label
            htmlFor="search"
            className="group focus-within:border-primary active:border-primary flex h-10 w-[300px] flex-row items-center gap-1 rounded-lg border border-zinc-400 p-0.5 transition duration-200"
          >
            <Search className="group-focus-within:text-primary h-4 w-4 text-zinc-400 transition duration-200" />
            <input
              id="search"
              className="flex-w group-focus-within:placeholder:text-primary/20 group-focus-within:text-primary h-full w-full bg-transparent text-zinc-400 transition duration-200 outline-none placeholder:text-zinc-400"
              placeholder="Pesquisar"
            />
          </label>
          <button
            onClick={() => setNewRouteOsSheetOpen(true)}
            className="bg-primary hover:bg-primary-dark flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 font-semibold text-white transition duration-200"
          >
            <Plus />
            <span>Planejamento de OS</span>
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
                onClick={() => setOpenOsPlanSheet(true)}
                className="hover:bg-primary/10 h-10 max-h-10 cursor-pointer text-center transition duration-200"
              >
                <TableCell className="py-1.5 text-sm font-medium whitespace-nowrap">
                  {plan.id}
                </TableCell>
                <TableCell className="py-1.5 text-sm font-medium whitespace-nowrap">
                  {plan.area}
                </TableCell>
                <TableCell className="py-1.5 text-sm font-medium whitespace-nowrap">
                  {plan.service}
                </TableCell>
                <TableCell className="py-1.5 text-sm font-medium whitespace-nowrap">
                  {plan.eqp}
                </TableCell>
                <TableCell className="py-1.5 text-sm font-medium whitespace-nowrap">
                  {plan.worker}
                </TableCell>
                <TableCell className="py-1.5 text-sm font-medium whitespace-nowrap">
                  {plan.startDate}
                </TableCell>
                <TableCell className="py-1.5 text-sm font-medium whitespace-nowrap">
                  {plan.endDate}
                </TableCell>

                <TableCell className="py-1.5 text-sm font-medium whitespace-nowrap text-white">
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
      {newRouteOsSheetOpen && (
        <NewOsPlanSheet
          open={newRouteOsSheetOpen}
          onClose={() => setNewRouteOsSheetOpen(false)}
        />
      )}
      {openOsPlanSheet && (
        <OsPlanSheet
          open={openOsPlanSheet}
          onClose={() => setOpenOsPlanSheet(false)}
        />
      )}
    </>
  );
}
