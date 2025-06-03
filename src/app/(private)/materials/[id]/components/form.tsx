import { MaterialProps } from "@/@types/materials";
import {
  CheckCheck,
  Factory,
  Info,
  NotepadText,
  Package,
  Scale,
  Tag,
} from "lucide-react";

interface FormProps {
  selectedMaterial: MaterialProps;
}

export function Form({ selectedMaterial }: FormProps) {
  return (
    <div className="grid w-full grid-cols-12 items-center justify-center gap-4 p-4">
      <div className="col-span-12 grid grid-cols-2 gap-2 xl:col-span-7 xl:grid-cols-3 xl:gap-4">
        <div className="flex flex-col gap-1 xl:gap-2">
          <div className="flex items-center gap-1">
            <Tag className="fill-primary h-4 text-white" />
            <span className="text-primary text-sm">Material</span>
          </div>
          <label className="bg-primary relative flex h-10 items-center justify-end rounded-2xl px-2 md:px-4 xl:h-12">
            <input
              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
              placeholder="Nome do Material"
              value={selectedMaterial.name}
              readOnly
            />
            <CheckCheck className="h-4 text-white" />
            <div className="absolute left-0 z-10 h-full w-full rounded-2xl shadow-[0px_2px_7px_rgba(0,0,0,0.5)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.5)]" />
          </label>
        </div>
        <div className="flex flex-col gap-1 xl:gap-2">
          <div className="flex items-center gap-1">
            <NotepadText className="fill-primary h-4 text-white" />
            <span className="text-primary text-sm">Código</span>
          </div>
          <label className="bg-primary relative flex h-10 items-center justify-end rounded-2xl px-2 md:px-4 xl:h-12">
            <input
              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
              placeholder="Nome do Material"
              value={selectedMaterial.code}
              readOnly
            />
            <CheckCheck className="h-4 text-white" />
            <div className="absolute left-0 z-10 h-full w-full rounded-2xl shadow-[0px_2px_7px_rgba(0,0,0,0.5)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.5)]" />
          </label>
        </div>
        <div className="flex flex-col gap-1 xl:gap-2">
          <div className="flex items-center gap-1">
            <Info className="fill-primary h-4 text-white" />
            <span className="text-primary text-sm">Tipo</span>
          </div>
          <label className="bg-primary relative flex h-10 items-center justify-end rounded-2xl px-2 md:px-4 xl:h-12">
            <input
              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
              placeholder="Nome do Material"
              value={selectedMaterial.type}
              readOnly
            />
            <CheckCheck className="h-4 text-white" />
            <div className="absolute left-0 z-10 h-full w-full rounded-2xl shadow-[0px_2px_7px_rgba(0,0,0,0.5)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.5)]" />
          </label>
        </div>
        <div className="flex flex-col gap-1 xl:gap-2">
          <div className="flex items-center gap-1">
            <Factory className="fill-primary h-4 text-white" />
            <span className="text-primary text-sm">Fabricante</span>
          </div>
          <label className="bg-primary relative flex h-10 items-center justify-end rounded-2xl px-2 md:px-4 xl:h-12">
            <input
              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
              placeholder="Nome do Material"
              value={selectedMaterial.maker}
              readOnly
            />
            <CheckCheck className="h-4 text-white" />
            <div className="absolute left-0 z-10 h-full w-full rounded-2xl shadow-[0px_2px_7px_rgba(0,0,0,0.5)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.5)]" />
          </label>
        </div>
        <div className="flex flex-col gap-1 xl:gap-2">
          <div className="flex items-center gap-1">
            <Package className="fill-primary h-4 text-white" />
            <span className="text-primary text-sm">Embalagem</span>
          </div>
          <label className="bg-primary relative flex h-10 items-center justify-end rounded-2xl px-2 md:px-4 xl:h-12">
            <input
              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
              placeholder="Nome do Material"
              value={selectedMaterial.packaging}
              readOnly
            />
            <CheckCheck className="h-4 text-white" />
            <div className="absolute left-0 z-10 h-full w-full rounded-2xl shadow-[0px_2px_7px_rgba(0,0,0,0.5)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.5)]" />
          </label>
        </div>
        <div className="flex flex-col gap-1 xl:gap-2">
          <div className="flex items-center gap-1">
            <Scale className="fill-primary text-primary h-4" />
            <span className="text-primary text-sm">Volume</span>
          </div>
          <label className="bg-primary relative flex h-10 items-center justify-end rounded-2xl px-2 md:px-4 xl:h-12">
            <input
              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
              placeholder="Nome do Material"
              value={selectedMaterial.volume}
              readOnly
            />
            <CheckCheck className="h-4 text-white" />
            <div className="absolute left-0 z-10 h-full w-full rounded-2xl shadow-[0px_2px_7px_rgba(0,0,0,0.5)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.5)]" />
          </label>
        </div>
      </div>
      <div className="col-span-12 h-40 xl:col-span-5 xl:h-full">
        <div className="flex h-full flex-col gap-2">
          <div className="flex items-center gap-1">
            <NotepadText className="fill-primary text-primary h-4" />
            <span className="text-primary text-sm">Descrição</span>
          </div>
          <label className="bg-primary relative flex h-full items-center justify-end rounded-2xl px-2 md:px-4">
            <textarea
              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] resize-none p-2 text-xs text-white placeholder:text-white focus:outline-none md:p-4 md:text-sm"
              placeholder="Descrição do Material"
            />
            <CheckCheck className="h-4 text-white" />
            <div className="absolute left-0 z-10 h-full w-full rounded-2xl shadow-[0px_2px_7px_rgba(0,0,0,0.5)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.5)]" />
          </label>
        </div>
      </div>
    </div>
  );
}
