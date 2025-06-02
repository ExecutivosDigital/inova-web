"use client";
import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, Search } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMediaQuery } from "@/utils/use-media-query";
import { Icon } from "@iconify/react";
import { Grip, Menu } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const statusColors: { [key: string]: any } = {
  todo: "warning",
  completed: "success",
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const priorityColors: { [key: string]: any } = {
  high: "destructive",
  medium: "warning",
  low: "success",
};

const TaskTable = ({
  data,
  handleEditSheetOpen,
  handleSidebar,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  handleEditSheetOpen: () => void;
  handleSidebar: () => void;
}) => {
  const isDesktop = useMediaQuery("(max-width: 1280px)");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "title",
      header: ({ table }) => (
        <div className="flex items-center gap-3 pl-8">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
          <span className="text-default-800">Tarefa</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3 pr-4">
          <Button
            type="button"
            size="icon"
            className="bg-default-100 hover:bg-default-200 h-5 w-5 cursor-move rounded"
          >
            <Grip className="text-default-400 h-3 w-3" />
          </Button>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 rounded-[2px]">
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
            <div className="text-default-600 max-w-[160px] truncate text-sm capitalize">
              {row.original?.title}
            </div>
          </div>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div>
          <Badge
            variant="soft"
            color={statusColors[row.getValue("status") as string]}
            className="capitalize"
          >
            {row.getValue("status") === "inprogress"
              ? "Pendente"
              : row.getValue("status") === "todo"
                ? "Em Andamento"
                : row.getValue("status") === "completed"
                  ? "Completa"
                  : ""}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "assign",
      header: "Designado",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: any) => (
        <div>
          {row.getValue("assign")?.length > 0 && (
            <div className="flex items-center gap-3">
              <AvatarGroup
                max={2}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                total={(row.getValue("assign") as any[]).length}
                countClass="w-8 h-8"
              >
                {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  row.getValue("assign").map((user: any, index: number) => (
                    <TooltipProvider key={`assigned-user-${index}`}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Avatar className="ring-background ring-offset-background h-8 w-8 ring-1 ring-offset-[2px]">
                            <AvatarImage src={user.image.src} />
                            <AvatarFallback>AB</AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent color="primary">
                          <p>{user.name}</p>
                          <TooltipArrow className="fill-primary" />
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))
                }
              </AvatarGroup>
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "priority",
      header: "Prioridade",
      cell: ({ row }) => (
        <Badge
          color={priorityColors[row.getValue("priority") as string] || ""}
          className="capitalize"
        >
          {row.getValue("priority") === "high"
            ? "Alta"
            : row.getValue("priority") === "medium"
              ? "Média"
              : "Baixa"}
        </Badge>
      ),
    },
    {
      accessorKey: "date",
      header: "Data Limite",
      cell: ({ row }) => (
        <div className="text-default-600 text-sm whitespace-nowrap">
          {row.getValue("date")}
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "Ações",
      cell: () => {
        return (
          <div className="flex items-center justify-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7"
              onClick={handleEditSheetOpen}
            >
              <Icon icon="heroicons:pencil" className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7"
              color="warning"
            >
              <Icon icon="heroicons:trash" className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex h-full w-full flex-col">
      <CardHeader className="mb-0 flex-none flex-row flex-wrap p-3 sm:p-6">
        <div className="flex flex-1 items-center gap-3 md:gap-4">
          {isDesktop && (
            <Menu
              className="text-default-600 h-5 w-5 cursor-pointer"
              onClick={handleSidebar}
            />
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-default-300 text-default-500"
              >
                Filtrar <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Asc</DropdownMenuItem>
              <DropdownMenuItem>Desc</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-default-300 text-default-500"
              >
                Todas Tarefas <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Tarefa 1</DropdownMenuItem>
              <DropdownMenuItem>Tarefa 2</DropdownMenuItem>
              <DropdownMenuItem>Tarefa 3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-full md:w-fit md:flex-none">
          <div className="relative">
            <Search className="text-default-400 absolute top-1/2 h-4 w-4 -translate-y-1/2 ltr:left-2 rtl:right-2" />
            <Input
              placeholder="Buscar Tarefas"
              className="h-10 ltr:pl-7 rtl:pr-7"
              value={
                (table.getColumn("title")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="w-full flex-1 p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup, index) => (
                <TableRow key={`task-headerGroup-${index}`}>
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <TableHead
                        key={`task-header-${index}`}
                        className="border-default-200 text-default-800 border-r text-sm last:text-center rtl:text-right rtl:first:pr-5"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="[&_tr:last-child]:border-1">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={`task-bodyGroup-${index}`}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={`task-bodyGroup-${index}`}
                        className="border-default-200 border-r"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex-none">
        <div className="flex w-full flex-wrap items-center gap-4">
          <div className="text-muted-foreground flex-1 text-sm whitespace-nowrap">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} lista(s) selecionada(s).
          </div>

          <div className="flex flex-none items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8"
            >
              <Icon
                icon="heroicons:chevron-left"
                className="h-4 w-4 rtl:rotate-180"
              />
            </Button>
            <ul className="flex items-center gap-3">
              {table.getPageOptions().map((page, pageIdx) => (
                <li key={`pagination-${pageIdx}`}>
                  <Button
                    onClick={() => table.setPageIndex(pageIdx)}
                    className={`h-8 w-8`}
                  >
                    {page + 1}
                  </Button>
                </li>
              ))}
            </ul>

            <Button
              variant="outline"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 rtl:rotate-180"
            >
              <Icon icon="heroicons:chevron-right" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </div>
  );
};

export default TaskTable;
