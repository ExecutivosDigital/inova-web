"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// avatar

import { Button } from "@/components/ui/button";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { cn } from "@/lib/utils";
import { materials } from "@/mock/materials";
import { Eye, LayersIcon, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NewMaterialModal } from "./NewMaterialModal";

const TableWithCards = () => {
  const router = useRouter();
  const columns = [
    { key: "name", label: "Nome Comercial" },
    { key: "code", label: "Código" },
    { key: "type", label: "Tipo" },
    { key: "maker", label: "Fabricante" },
    { key: "volume", label: "Volume" },
    { key: "amount", label: "Estoque" },
    { key: "packaging", label: "Embalagem" },
    { key: "minimum", label: "Mínimo" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Ações" },
  ];

  const [materialPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openNewMaterialModal, setOpenNewMaterialModal] =
    useState<boolean>(false);

  return (
    <>
      <Card className="h-full overflow-hidden">
        <div className="flex h-40 w-full items-center justify-center bg-[url('/static/materials-header.png')] bg-cover bg-center bg-no-repeat">
          <div className="flex items-center gap-2 text-white">
            <LayersIcon />
            <span className="text-2xl font-bold">MATERIAIS</span>
          </div>
        </div>
        <CardHeader className="mb-0 flex-row items-center justify-between">
          <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row">
            <span className="text-primary text-2xl font-bold">
              Lista de Materiais
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
            <Button
              onClick={() => setOpenNewMaterialModal(true)}
              className="m-0 text-white lg:h-max lg:px-2 lg:py-1 lg:text-xs xl:h-9 xl:px-3 xl:py-2 xl:text-sm"
            >
              <Plus className="h-4 w-4 text-white ltr:mr-1 rtl:ml-1" />
              Novo Material
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto px-0 pb-0">
          <Table>
            <TableHeader className="bg-primary">
              <TableRow className="border-primary gap-[1px]">
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className="h-12 flex-row text-end text-sm font-semibold text-white uppercase last:text-start"
                  >
                    <p className="text-center">{column.label}</p>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((material) => (
                <TableRow
                  key={material.id}
                  onClick={() => router.push(`/materials/${material.id}`)}
                  className="hover:bg-primary/10 cursor-pointer text-center transition duration-200"
                >
                  <TableCell className="text-primary py-0.5 text-sm font-medium whitespace-nowrap">
                    {material.name}
                  </TableCell>
                  <TableCell className="text-primary py-.5 text-sm font-medium whitespace-nowrap">
                    {material.code}
                  </TableCell>
                  <TableCell className="text-primary py-.5 text-sm font-medium whitespace-nowrap">
                    {material.type}
                  </TableCell>
                  <TableCell className="text-primary py-0.5 text-sm font-medium whitespace-nowrap">
                    {material.maker}
                  </TableCell>
                  <TableCell className="text-primary py-.5 text-sm font-medium whitespace-nowrap">
                    {material.volume}
                  </TableCell>
                  <TableCell className="text-primary py-0.5 text-sm font-medium whitespace-nowrap">
                    {material.amount}
                  </TableCell>
                  <TableCell className="text-primary py-.5 text-sm font-medium whitespace-nowrap">
                    {material.packaging}
                  </TableCell>
                  <TableCell className="text-primary py-.5 text-sm font-medium whitespace-nowrap">
                    {material.minimum}
                  </TableCell>
                  <TableCell className="text-primary py-0.5 text-sm font-medium whitespace-nowrap">
                    <div
                      className={cn(
                        "mx-auto w-max rounded-md border px-2 py-1",
                        material.status === "Normal"
                          ? "border-green-500 bg-green-500/20 text-green-500"
                          : "border-red-500 bg-red-500/20 text-red-500",
                      )}
                    >
                      {material.status}
                    </div>
                  </TableCell>
                  <TableCell className="py-0.5 text-sm font-medium whitespace-nowrap text-white">
                    <div className="bg-primary mx-auto w-max rounded-md p-1">
                      <Eye />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="mt-4 flex-none">
          <CustomPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={materialPages}
          />
        </CardFooter>
      </Card>
      {openNewMaterialModal && (
        <NewMaterialModal
          isOpen={openNewMaterialModal}
          close={() => setOpenNewMaterialModal(false)}
        />
      )}
    </>
  );
};

export default TableWithCards;
