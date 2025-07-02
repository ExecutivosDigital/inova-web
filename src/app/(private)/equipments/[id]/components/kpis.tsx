"use client";
import { DatePicker } from "@/components/date-picker";
import { useState } from "react";

export function Kpis() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex w-full items-center justify-between">
        <span className="text-primary text-xl font-semibold 2xl:text-2xl">
          Indicadores do Equipamento
        </span>
        <DatePicker
          isFiltersOpen={isFiltersOpen}
          setIsFiltersOpen={setIsFiltersOpen}
        />
      </div>
      <div className="flex w-full flex-col items-center justify-evenly gap-4 xl:flex-row">
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-1.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            CUSTOS DE MATERIAIS
          </span>
          <span className="text-2xl font-bold text-white xl:text-3xl">
            R$33.000,00
          </span>
        </div>
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-2.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            QUANTIDADE DE MATERIAIS UTILIZADOS
          </span>
          <span className="text-center text-2xl font-bold text-white xl:text-3xl">
            100 Litros <br /> 6 Peças
          </span>
        </div>
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-3.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            TOTAL DE ORDENS DE SERVIÇO
          </span>
          <span className="text-2xl font-bold text-white xl:text-3xl">
            200 OS
          </span>
        </div>
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-4.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            DIAS ATÉ PRÓXIMO SERVIÇO
          </span>
          <span className="text-2xl font-bold text-white xl:text-3xl">
            12 Dias
          </span>
        </div>
      </div>
    </div>
  );
}
