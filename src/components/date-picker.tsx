"use client";
import { useDatePicker } from "@/context/DatePickerContext";
import { useState } from "react";
import { Matcher } from "react-day-picker";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Label } from "./ui/label";

interface DatePickerProps {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (value: boolean) => void;
}

export function DatePicker({
  isFiltersOpen,
  setIsFiltersOpen,
}: DatePickerProps) {
  const { startDate, endDate, setStartDate, setEndDate } = useDatePicker();
  const [localStartDateFilter, setLocalStartDateFilter] =
    useState<Date>(startDate);
  const [localEndDateFilter, setLocalEndDateFilter] = useState<Date>(endDate);
  const [range, setRange] = useState<{
    from?: Date;
    to?: Date;
  }>({
    from: localStartDateFilter,
    to: localEndDateFilter,
  });

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
  return (
    <DropdownMenu open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
      <DropdownMenuTrigger className="self-end" asChild>
        <button className="border-primary text-primary rounded-md border px-2 py-1 text-xs font-semibold focus:outline-none xl:px-4 xl:py-2 xl:text-sm">
          {startDate.toLocaleDateString("pt-BR") +
            " - " +
            endDate.toLocaleDateString("pt-BR")}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border-primary flex w-auto flex-col bg-white p-0 2xl:p-2"
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
          className="m-1 h-max py-1 text-white"
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
  );
}
