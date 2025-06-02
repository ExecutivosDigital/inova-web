"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProfileInfo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="bg-primary flex h-10 w-10 items-center rounded-full" />
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
