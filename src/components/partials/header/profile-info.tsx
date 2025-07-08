"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";

export function ProfileInfo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="bg-primary flex h-10 w-10 items-center rounded-full" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="left">
        <DropdownMenuArrow className="fill-zinc-400" />
        <DropdownMenuItem>Lorem lipsum</DropdownMenuItem>
        <DropdownMenuItem>Lorem lipsum</DropdownMenuItem>
        <DropdownMenuItem>Lorem lipsum</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
