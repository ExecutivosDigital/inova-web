"use client";
import { EquipmentTypeProps } from "@/@types/EquipmentTypes";
import { SectorProps } from "@/@types/LayoutTypes";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CustomPagination } from "@/components/ui/custom-pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEquipmentContext } from "@/context/EquipmentContext";
import { useLayoutContext } from "@/context/LayoutContext";

import { cn } from "@/lib/utils";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  Search,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";

interface EquipmentLocationAccordionProps {
  selectedEquipmentStep: number;
  setSelectedEquipmentStep: React.Dispatch<React.SetStateAction<number>>;
}

export function EquipmentLocationAccordion({
  selectedEquipmentStep,
  setSelectedEquipmentStep,
}: EquipmentLocationAccordionProps) {
  const { layoutData } = useLayoutContext();
  const { equipmentData, setEquipmentData } = useEquipmentContext();

  const [isImportHovered, setIsImportHovered] = useState(false);
  const [selectedSector, setSelectedSector] = useState<SectorProps | null>(
    null,
  );
  const [equipmentPages, setEquipmentPages] = useState<number>(1);
  const [currentEquipmentPage, setCurrentEquipmentPage] = useState(1);
  const [isSectorNameHovered, setIsSectorNameHovered] = useState(false);
  const [isEquipmentNameHovered, setIsEquipmentNameHovered] = useState(false);
  const [selectedEquipment, setSelectedEquipment] =
    useState<EquipmentTypeProps | null>(null);

  const handleInputChange = (
    index: number,
    field: keyof EquipmentTypeProps,
    value: string | string[],
  ) => {
    if (!selectedSector) return;

    setEquipmentData((prevEquipment) => {
      const updatedEquipment = [...prevEquipment];
      updatedEquipment[index] = {
        ...updatedEquipment[index],
        [field]: value,
      };
      return updatedEquipment;
    });
    setSelectedEquipment((prevEquipment) => {
      if (!prevEquipment) return null;
      return {
        ...prevEquipment,
        [field]: value,
      };
    });
  };

  useEffect(() => {
    setEquipmentPages(
      Math.ceil((selectedSector?.equipments?.length || 0) / 12),
    );
  }, [selectedSector?.equipments?.length]);

  const isEquipmentInfoFullyFilled = (data: EquipmentTypeProps) => {
    return (
      data.position &&
      data.operationRegime &&
      data.CC &&
      data.criticality &&
      data.safetyMeasures
    );
  };

  return (
    <AccordionItem value="4" onClick={() => setSelectedEquipmentStep(4)}>
      <AccordionTrigger arrow>
        <div className="flex w-full items-center justify-between">
          <div className="text-primary flex items-center gap-2 text-base font-bold md:gap-4 md:text-2xl">
            <span>1.4</span>
            <div className="flex flex-col">
              <span className="leading-6">Localização e Operação</span>
              <span
                className={cn(
                  "w-max text-xs font-normal text-neutral-500 md:text-sm",
                  selectedEquipmentStep !== 4 && "hidden",
                )}
              >
                O que é um Subconjunto? Explicitar
              </span>
            </div>
          </div>
          {selectedEquipmentStep === 4 && (
            <div className="flex items-center gap-4">
              <Popover open={isImportHovered} onOpenChange={setIsImportHovered}>
                <PopoverTrigger
                  asChild
                  onMouseEnter={() => setIsImportHovered(true)}
                  onMouseLeave={() => setIsImportHovered(false)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsImportHovered(false);
                  }}
                  onBlur={() => setIsImportHovered(false)}
                >
                  <div className="bg-primary flex h-6 items-center gap-2 rounded-full p-1 text-sm font-semibold text-white md:h-10 md:p-2">
                    <Upload className="h-4 md:h-8" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-max bg-white p-1 text-sm">
                  <PopoverArrow className="fill-neutral-300" />
                  <span>Importar Planilhas</span>
                </PopoverContent>
              </Popover>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEquipmentStep(5);
                }}
                className={cn(
                  "bg-primary pointer-events-none flex h-6 cursor-not-allowed items-center gap-2 rounded-full px-2 py-2 text-sm font-semibold text-white opacity-50 md:h-10 md:px-4",
                  equipmentData.find(isEquipmentInfoFullyFilled) &&
                    "pointer-events-auto cursor-auto opacity-100",
                )}
              >
                <span className="hidden md:block">Avançar 1.5</span>
                <ArrowRight className="h-4 md:h-8" />
              </div>
            </div>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div
          className={cn(
            "grid grid-cols-4 gap-2 border-t border-neutral-300 p-2 md:gap-4 md:p-4",
            selectedEquipment && "grid-cols-2",
          )}
        >
          {selectedEquipment ? (
            <>
              <div className="col-span-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedEquipment(null)}
                    className="text-primary flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.35)] md:h-12 md:w-12"
                  >
                    <ChevronLeft />
                  </button>
                  <Popover
                    open={isSectorNameHovered}
                    onOpenChange={setIsSectorNameHovered}
                  >
                    <PopoverTrigger
                      asChild
                      onMouseEnter={() => setIsSectorNameHovered(true)}
                      onMouseLeave={() => setIsSectorNameHovered(false)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSectorNameHovered(false);
                      }}
                      onBlur={() => setIsSectorNameHovered(false)}
                    >
                      <label
                        className={cn(
                          "relative flex h-10 w-32 items-center justify-start overflow-hidden rounded-2xl pr-1 md:h-12 md:w-40",
                          "bg-primary",
                        )}
                      >
                        <span
                          className={cn(
                            "bg-primary/20 text-primary flex h-10 w-10 min-w-10 items-center justify-center rounded-2xl p-1 font-bold md:h-12 md:w-12 md:min-w-12",
                            "bg-white/20 text-white",
                          )}
                        >
                          {selectedSector?.position}
                        </span>
                        <input
                          className={cn(
                            "peer transparent h-full px-2 text-xs placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm",
                            "text-white",
                          )}
                          placeholder="Nome da Área"
                          value={selectedSector?.name}
                          disabled
                        />

                        <div
                          className={cn(
                            "absolute left-0 z-10 h-full w-full rounded-2xl shadow-[0px_2px_7px_rgba(0,0,0,0.15)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.5)]",
                            "shadow-[0px_2px_7px_rgba(0,0,0,0.35)]",
                          )}
                        />
                      </label>
                    </PopoverTrigger>
                    <PopoverContent className="w-max max-w-40 bg-white p-1 text-sm break-words">
                      <PopoverArrow className="fill-neutral-300" />
                      <span>{selectedSector?.name}</span>
                    </PopoverContent>
                  </Popover>
                  <Popover
                    open={isEquipmentNameHovered}
                    onOpenChange={setIsEquipmentNameHovered}
                  >
                    <PopoverTrigger
                      asChild
                      onMouseEnter={() => setIsEquipmentNameHovered(true)}
                      onMouseLeave={() => setIsEquipmentNameHovered(false)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEquipmentNameHovered(false);
                      }}
                      onBlur={() => setIsEquipmentNameHovered(false)}
                    >
                      <label
                        className={cn(
                          "relative flex h-10 w-32 items-center justify-start overflow-hidden rounded-2xl pr-1 md:h-12 md:w-40",
                          "bg-primary",
                        )}
                      >
                        <span
                          className={cn(
                            "bg-primary/20 text-primary flex h-10 w-10 min-w-10 items-center justify-center rounded-2xl p-1 font-bold md:h-12 md:w-12 md:min-w-12",
                            "bg-white/20 text-white",
                          )}
                        >
                          {selectedEquipment?.position}
                        </span>
                        <input
                          className={cn(
                            "peer transparent h-full px-2 text-xs placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm",
                            "text-white",
                          )}
                          placeholder="Nome da Área"
                          value={selectedEquipment?.name}
                          disabled
                        />

                        <div
                          className={cn(
                            "absolute left-0 z-10 h-full w-full rounded-2xl shadow-[0px_2px_7px_rgba(0,0,0,0.15)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.5)]",
                            "shadow-[0px_2px_7px_rgba(0,0,0,0.35)]",
                          )}
                        />
                      </label>
                    </PopoverTrigger>
                    <PopoverContent className="w-max max-w-40 bg-white p-1 text-sm break-words">
                      <PopoverArrow className="fill-neutral-300" />
                      <span>{selectedEquipment?.name}</span>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-primary text-xs md:text-sm">
                  Posição Física
                </span>
                <input
                  type="text"
                  className="h-10 w-full rounded-2xl bg-white p-2 px-2 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] placeholder:text-neutral-300 focus:outline-none md:h-12 md:px-4"
                  placeholder="Posição do Equipamento"
                  value={
                    equipmentData.find((eq) => eq.id === selectedEquipment.id)
                      ?.position
                  }
                  onChange={(e) =>
                    handleInputChange(
                      Number(
                        equipmentData
                          .find((eq) => eq.id === selectedEquipment.id)
                          ?.position.split(".")[2],
                      ) - 1,
                      "position",
                      e.target.value,
                    )
                  }
                />
              </div>
              <div className="flex flex-col">
                <span className="text-primary text-xs md:text-sm">
                  Regime de Operação
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="group relative">
                    <div className="relative flex w-full items-center">
                      <input
                        type="text"
                        className="h-10 w-full rounded-2xl bg-white p-2 px-2 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] placeholder:text-neutral-300 focus:outline-none md:h-12 md:px-4"
                        placeholder="Tipo do Equipamento"
                        value={
                          equipmentData.find(
                            (eq) => eq.id === selectedEquipment.id,
                          )?.operationRegime || ""
                        }
                        readOnly
                      />
                      <ChevronDown className="absolute top-1/2 right-0 -translate-y-1/2 transition duration-150 data-[state=closed]:rotate-180" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <DropdownMenuArrow />
                    <DropdownMenuItem
                      onClick={() =>
                        handleInputChange(
                          Number(
                            equipmentData
                              .find((eq) => eq.id === selectedEquipment.id)
                              ?.position.split(".")[2],
                          ) - 1,
                          "operationRegime",
                          "Operando",
                        )
                      }
                    >
                      Operando
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleInputChange(
                          Number(
                            equipmentData
                              .find((eq) => eq.id === selectedEquipment.id)
                              ?.position.split(".")[2],
                          ) - 1,
                          "operationRegime",
                          "Parado",
                        )
                      }
                    >
                      Parado
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleInputChange(
                          Number(
                            equipmentData
                              .find((eq) => eq.id === selectedEquipment.id)
                              ?.position.split(".")[2],
                          ) - 1,
                          "operationRegime",
                          "Parada Geral",
                        )
                      }
                    >
                      Parada Geral
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-col">
                <span className="text-primary text-xs md:text-sm">
                  Centro de Custos
                </span>
                <input
                  type="text"
                  className="h-10 w-full rounded-2xl bg-white p-2 px-2 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] placeholder:text-neutral-300 focus:outline-none md:h-12 md:px-4"
                  placeholder="C.C."
                  value={
                    equipmentData.find((eq) => eq.id === selectedEquipment.id)
                      ?.CC
                  }
                  onChange={(e) =>
                    handleInputChange(
                      Number(
                        equipmentData
                          .find((eq) => eq.id === selectedEquipment.id)
                          ?.position.split(".")[2],
                      ) - 1,
                      "CC",
                      e.target.value,
                    )
                  }
                />
              </div>
              <div className="flex flex-col">
                <span className="text-primary text-xs md:text-sm">
                  Criticidade
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="group relative">
                    <div className="relative flex w-full items-center">
                      <input
                        type="text"
                        className="h-10 w-full rounded-2xl bg-white p-2 px-2 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] placeholder:text-neutral-300 focus:outline-none md:h-12 md:px-4"
                        placeholder="Tipo do Equipamento"
                        value={
                          equipmentData.find(
                            (eq) => eq.id === selectedEquipment.id,
                          )?.criticality || ""
                        }
                        readOnly
                      />
                      <ChevronDown className="absolute top-1/2 right-0 -translate-y-1/2 transition duration-150 data-[state=closed]:rotate-180" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <DropdownMenuArrow />
                    <DropdownMenuItem
                      onClick={() =>
                        handleInputChange(
                          Number(
                            equipmentData
                              .find((eq) => eq.id === selectedEquipment.id)
                              ?.position.split(".")[2],
                          ) - 1,
                          "criticality",
                          "Criticidade A",
                        )
                      }
                    >
                      Criticidade A
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleInputChange(
                          Number(
                            equipmentData
                              .find((eq) => eq.id === selectedEquipment.id)
                              ?.position.split(".")[2],
                          ) - 1,
                          "criticality",
                          "Criticidade B",
                        )
                      }
                    >
                      Criticidade B
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleInputChange(
                          Number(
                            equipmentData
                              .find((eq) => eq.id === selectedEquipment.id)
                              ?.position.split(".")[2],
                          ) - 1,
                          "criticality",
                          "Criticidade C",
                        )
                      }
                    >
                      Criticidade C
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-col">
                <span className="text-primary text-xs md:text-sm">
                  Condições de Segurança
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="group relative">
                    <div className="relative flex w-full items-center">
                      <input
                        type="text"
                        className="h-10 w-full rounded-2xl bg-white p-2 px-2 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] placeholder:text-neutral-300 focus:outline-none md:h-12 md:px-4"
                        placeholder="Tipo do Equipamento"
                        value={
                          equipmentData.find(
                            (eq) => eq.id === selectedEquipment.id,
                          )?.safetyMeasures || ""
                        }
                        readOnly
                      />
                      <ChevronDown className="absolute top-1/2 right-0 -translate-y-1/2 transition duration-150 data-[state=closed]:rotate-180" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <DropdownMenuArrow />
                    <DropdownMenuItem
                      onClick={() =>
                        handleInputChange(
                          Number(
                            equipmentData
                              .find((eq) => eq.id === selectedEquipment.id)
                              ?.position.split(".")[2],
                          ) - 1,
                          "safetyMeasures",
                          "Necessita Bloqueio",
                        )
                      }
                    >
                      Necessita Bloqueio
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleInputChange(
                          Number(
                            equipmentData
                              .find((eq) => eq.id === selectedEquipment.id)
                              ?.position.split(".")[2],
                          ) - 1,
                          "safetyMeasures",
                          "Não Necessita Bloqueio",
                        )
                      }
                    >
                      Não Necessita Bloqueio
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <>
              <div className="col-span-4 flex flex-col gap-2">
                <span>
                  Texto para Explicar que deverá selecionar um Setor antes do
                  Equipamento:
                </span>
                <label className="border-primary relative flex h-8 w-60 items-center rounded-md border">
                  <input
                    className="transparent placeholder:neutral-300 absolute left-0 h-full w-[calc(100%-2rem)] rounded-md px-4 focus:outline-none"
                    placeholder="Buscar Setor"
                  />
                  <div className="bg-primary absolute right-0 flex h-full w-8 items-center justify-center">
                    <Search size={12} />
                  </div>
                </label>
              </div>
              {equipmentData
                .slice(
                  (currentEquipmentPage - 1) * 12,
                  currentEquipmentPage * 12,
                )
                .map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <label
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSector(
                          layoutData.areas
                            ?.flatMap((area) => area.sectors || []) // Flatten the sectors into an array
                            ?.find(
                              (sector) =>
                                sector.position === item.position.slice(0, 3),
                            ) as SectorProps,
                        );
                        setSelectedEquipment(item);
                      }}
                      className={cn(
                        "relative flex h-10 cursor-pointer items-center justify-start rounded-2xl md:h-12",
                        isEquipmentInfoFullyFilled(item) && "bg-primary",
                      )}
                    >
                      <span
                        className={cn(
                          "bg-primary/20 text-primary flex h-10 w-10 items-center justify-center rounded-2xl p-1 font-bold md:h-12 md:w-12",
                          isEquipmentInfoFullyFilled(item) &&
                            "bg-white/20 text-white",
                        )}
                      >
                        {item.position}
                      </span>
                      <input
                        className={cn(
                          "peer transparent absolute right-0 h-full w-[calc(100%-2.5rem)] px-2 text-xs placeholder:text-neutral-300 focus:outline-none md:w-[calc(100%-3rem)] md:px-4 md:text-sm",
                          isEquipmentInfoFullyFilled(item) && "text-white",
                        )}
                        placeholder="Nome da Área"
                        value={item.name}
                        disabled
                      />

                      <div
                        className={cn(
                          "absolute left-0 z-10 h-full w-full rounded-2xl shadow-[0px_2px_7px_rgba(0,0,0,0.15)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.5)]",
                          isEquipmentInfoFullyFilled(item) &&
                            "shadow-[0px_2px_7px_rgba(0,0,0,0.5)]",
                        )}
                      />
                    </label>
                  </div>
                ))}
            </>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!selectedEquipment) {
                setSelectedEquipmentStep(1);
              } else if (selectedEquipment) {
                setSelectedEquipmentStep(2);
              }
            }}
            className={cn(
              "bg-primary flex h-10 w-full items-center justify-center gap-1 self-end rounded-full px-1 font-bold text-white md:px-4",
            )}
          >
            <p className="text-xs md:text-sm">+</p>
            <p className="hidden md:block">
              Cadastrar {selectedEquipment ? " Conjunto" : " Equipamento"}
            </p>
          </button>
        </div>
        <div>
          <CustomPagination
            currentPage={currentEquipmentPage}
            setCurrentPage={setCurrentEquipmentPage}
            pages={equipmentPages}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
