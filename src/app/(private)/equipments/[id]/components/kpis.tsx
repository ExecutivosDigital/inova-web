"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import moment from "moment";
import { useState } from "react";
import { Matcher } from "react-day-picker";

export function Kpis() {
  const [startDate, setStartDate] = useState(moment().toDate());
  const [endDate, setEndDate] = useState(moment().subtract(1, "week").toDate());
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [localStartDateFilter, setLocalStartDateFilter] =
    useState<Date>(startDate);
  const [localEndDateFilter, setLocalEndDateFilter] = useState<Date>(endDate);
  function getRangeModifier(from?: Date, to?: Date) {
    if (!from || !to) return undefined;
    const start = from < to ? from : to;
    const end = from < to ? to : from;
    if (localStartDateFilter !== start || localEndDateFilter !== end) {
      setLocalStartDateFilter(start);
      setLocalEndDateFilter(end);
    }
    return { from: start, to: end };
  }
  const [range, setRange] = useState<{
    from?: Date;
    to?: Date;
  }>({
    from: localStartDateFilter,
    to: localEndDateFilter,
  });

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex w-full items-center justify-between">
        <span className="text-primary text-2xl font-semibold">
          Indicadores do Material
        </span>
        <DropdownMenu open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <DropdownMenuTrigger className="self-end" asChild>
            <button className="border-primary text-primary rounded-md border px-4 py-2 font-semibold focus:outline-none">
              {startDate.toLocaleDateString("pt-BR") +
                " - " +
                endDate.toLocaleDateString("pt-BR")}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="flex w-auto flex-col bg-white p-2"
            align="end"
          >
            <div className="flex gap-2">
              <div className="flex flex-col">
                <Label className="mx-auto text-center text-lg font-semibold">
                  Data de Início
                </Label>
                <Calendar
                  mode="single"
                  selected={range.from}
                  defaultMonth={localStartDateFilter}
                  onSelect={(day) => {
                    if (!day) return;
                    setRange((prev) => ({ ...prev, from: day }));
                  }}
                  // Destaca o intervalo
                  modifiers={{
                    inRange: getRangeModifier(range.from, range.to) as Matcher,
                  }}
                  modifiersClassNames={{
                    inRange: "bg-zinc-400/20",
                  }}
                />
              </div>
              <div className="flex flex-col">
                <Label className="mx-auto text-center text-lg font-semibold">
                  Data de Fim
                </Label>
                <Calendar
                  mode="single"
                  selected={range.to}
                  defaultMonth={localEndDateFilter}
                  onSelect={(day) => {
                    if (!day) return;
                    setRange((prev) => ({ ...prev, to: day }));
                  }}
                  // Destaca o intervalo
                  modifiers={{
                    inRange: getRangeModifier(range.from, range.to) as Matcher,
                  }}
                  modifiersClassNames={{
                    inRange: "bg-zinc-400/20",
                  }}
                />
              </div>
            </div>
            <Button
              className="m-1"
              onClick={() => {
                setStartDate(localStartDateFilter);
                setEndDate(localEndDateFilter);
                setIsFiltersOpen(false);
              }}
            >
              Confirmar
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex w-full flex-col items-center justify-evenly gap-4 xl:flex-row">
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-1.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            CONSUMO MÉDIO DO MATERIAL
          </span>
          <span className="text-2xl font-bold text-white xl:text-3xl">47</span>
        </div>
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-2.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            OS COM ESTE MATERIAL
          </span>
          <span className="text-2xl font-bold text-white xl:text-3xl">100</span>
        </div>
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-3.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            CUSTO TOTAL DO MATERIAL
          </span>
          <span className="text-2xl font-bold text-white xl:text-3xl">
            R$12.345,67
          </span>
        </div>
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-4.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            EQUIPAMENTOS QUE UTILIZAM ESTE MATERIAL
          </span>
          <span className="text-2xl font-bold text-white xl:text-3xl">
            234 Eqp.
          </span>
        </div>
      </div>
    </div>
  );
}
