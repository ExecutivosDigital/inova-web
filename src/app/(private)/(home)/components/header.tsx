"use client";
import { DatePicker } from "@/components/date-picker";
import { useState } from "react";

export function Header() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="text-default-800 text-primary text-xl font-medium 2xl:text-2xl">
        Dashboard
      </div>
      <DatePicker
        isFiltersOpen={isFiltersOpen}
        setIsFiltersOpen={setIsFiltersOpen}
      />
    </div>
  );
}
