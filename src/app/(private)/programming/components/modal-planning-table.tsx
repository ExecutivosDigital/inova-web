"use client";
import { PlanningProps } from "@/@types/planning";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { CustomPagination } from "@/components/ui/custom-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import moment from "moment";
import { useMemo, useState } from "react";

interface ModalPlanningTableProps {
  selectedWorkers: { value: string; label: string }[];
  planningList: PlanningProps[];
  setPlanningList: (planningList: PlanningProps[]) => void;
}

export function ModalPlanningTable({
  selectedWorkers,
  planningList,
  setPlanningList,
}: ModalPlanningTableProps) {
  const [planningPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const sortPlanningByWorkers = (
    plans: PlanningProps[],
    selectedWorkers: Array<{ value: string; label: string }>,
  ) => {
    const selectedWorkerLabels = selectedWorkers.map((worker) => worker.label);

    return plans.sort((a, b) => {
      // Check if plan A has any selected workers
      const aHasSelectedWorker = a.worker.some((worker) =>
        selectedWorkerLabels.includes(worker.label),
      );

      // Check if plan B has any selected workers
      const bHasSelectedWorker = b.worker.some((worker) =>
        selectedWorkerLabels.includes(worker.label),
      );

      // If both or neither have selected workers, sort alphabetically by worker label
      if (aHasSelectedWorker === bHasSelectedWorker) {
        const aWorkerLabel = a.worker[0]?.label || "";
        const bWorkerLabel = b.worker[0]?.label || "";
        return aWorkerLabel.localeCompare(bWorkerLabel);
      }

      // Plans with selected workers come first
      return aHasSelectedWorker ? -1 : 1;
    });
  };

  // Apply sorting when component mounts or selectedWorkers change
  const sortedPlanningList = useMemo(() => {
    return sortPlanningByWorkers([...planningList], selectedWorkers);
  }, [planningList, selectedWorkers]);

  const columns = [
    { key: "id", label: "ID" },
    // { key: "area", label: "ÁREA" },
    { key: "service", label: "SERVIÇO" },
    { key: "eqp", label: "EQUIPAMENTO" },
    { key: "worker", label: "RESPONSÁVEL" },
    { key: "startDate", label: "Data INICIAL" },
    { key: "endDate", label: "DATA TÉRMINO" },
    { key: "action", label: "" },
  ];

  return (
    <>
      <div className="flex w-full flex-col gap-4 rounded-md bg-white">
        <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row">
          <span className="text-primary text-xl font-bold 2xl:text-2xl">
            Plano de Lubrificação
          </span>
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
            {sortedPlanningList.map((plan) => (
              <TableRow
                key={plan.id}
                onClick={() => {
                  setPlanningList(
                    planningList.map((item) => {
                      if (item.id === plan.id) {
                        return {
                          ...item,
                          selected: !item.selected,
                        };
                      }
                      return item;
                    }),
                  );
                }}
                className="hover:bg-primary/10 h-10 max-h-10 cursor-pointer text-center transition duration-200"
              >
                <TableCell className="py-1.5 text-sm font-medium whitespace-nowrap">
                  {plan.id}
                </TableCell>
                {/* <TableCell className="py-1.5 text-sm font-medium whitespace-nowrap">
                  {plan.area}
                </TableCell> */}
                <TableCell className="py-1.5 text-sm font-medium whitespace-nowrap">
                  {plan.eqp.service.name}
                </TableCell>
                <TableCell className="py-1.5 text-sm font-medium whitespace-nowrap">
                  {plan.eqp.name}
                </TableCell>
                <TableCell className="py-1.5 text-sm font-medium whitespace-nowrap">
                  {plan.worker.length > 0 && (
                    <div className="mx-auto w-max">
                      <AvatarGroup
                        max={3}
                        total={plan.worker.length}
                        countClass="w-7 h-7"
                      >
                        {plan.worker.map((user, i) => (
                          <TooltipProvider key={`tooltip-key-${i}`}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Avatar
                                  className="ring-primary ring-offset-primary h-7 w-7 ring-1 ring-offset-[2px]"
                                  key={`avatar-key-${i}`}
                                >
                                  <AvatarFallback>
                                    {user.label.charAt(0) +
                                      user.label.charAt(1)}
                                  </AvatarFallback>
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{user.label}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </AvatarGroup>
                    </div>
                  )}
                </TableCell>
                <TableCell className="py-1.5 text-sm font-medium whitespace-nowrap">
                  {moment(plan.startDate).format("DD/MM/YYYY HH:mm")}
                </TableCell>
                <TableCell className="py-1.5 text-sm font-medium whitespace-nowrap">
                  {moment(plan.endDate).format("DD/MM/YYYY HH:mm")}
                </TableCell>

                <TableCell className="py-1.5 text-sm font-medium whitespace-nowrap text-white">
                  <input
                    type="checkbox"
                    checked={plan.selected}
                    onChange={() => {
                      setPlanningList(
                        planningList.map((item) => {
                          if (item.id === plan.id) {
                            return {
                              ...item,
                              selected: !item.selected,
                            };
                          }
                          return item;
                        }),
                      );
                    }}
                  />
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
    </>
  );
}
