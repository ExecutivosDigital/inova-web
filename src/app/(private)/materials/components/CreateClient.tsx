"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "@/components/ui/sheet";

import Select from "react-select";

const sizes = [
  { value: "small", label: "Cliente Pequeno" },
  { value: "medium", label: "Cliente Médio" },
  { value: "large", label: "Cliente Grande" },
];

const colorStyles = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: (styles: any, { isSelected }: any) => {
    return {
      ...styles,
      color: isSelected ? "#000" : "#fff",
      background: isSelected ? "#fff" : "#0F172A",
    };
  },
};
const CreateClient = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="pt-5">
        <SheetHeader className="mb-4 flex-row items-center justify-between">
          <span className="text-default-900 text-lg font-semibold">
            Criar Cliente
          </span>
        </SheetHeader>
        <form className="flex h-full flex-col justify-between">
          <div className="space-y-4">
            <div>
              <Label htmlFor="farmName" className="text-default-600 mb-1.5">
                Nome do Cliente*
              </Label>
              <Input id="farmName" placeholder="Nome do Cliente" />
            </div>
            <div>
              <Label htmlFor="phone" className="text-default-600 mb-1.5">
                Telefone
              </Label>
              <Input id="phone" placeholder="Telefone" />
            </div>
            <div>
              <Label htmlFor="city" className="text-default-600 mb-1.5">
                Cidade
              </Label>
              <Input id="city" placeholder="Cidade " />
            </div>
            <div>
              <Label htmlFor="size" className="text-default-600 mb-1.5">
                Tamanho do Cliente
              </Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                options={sizes}
                styles={colorStyles}
                placeholder="Tamanho do Cliente"
              />
            </div>
          </div>
          <SheetFooter className="pb-10">
            <SheetClose asChild>
              <Button type="button" color="primary" variant="outline">
                Cancelar
              </Button>
            </SheetClose>
            <Button>Criar Cliente</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateClient;
