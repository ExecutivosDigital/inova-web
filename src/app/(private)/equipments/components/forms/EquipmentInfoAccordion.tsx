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
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useApiContext } from "@/context/ApiContext";
import { useEquipmentContext } from "@/context/EquipmentContext";
import { useLayoutContext } from "@/context/LayoutContext";
import { cn, sortByPosition } from "@/lib/utils";
import { ArrowRight, ChevronLeft, Loader2, Search, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface EquipmentInfoAccordionProps {
  selectedEquipmentStep: number;
  setSelectedEquipmentStep: React.Dispatch<React.SetStateAction<number>>;
}

export function EquipmentInfoAccordion({
  selectedEquipmentStep,
  setSelectedEquipmentStep,
}: EquipmentInfoAccordionProps) {
  const { layoutData } = useLayoutContext();
  const { equipmentData, setEquipmentData, originalEquipments, GetAllData } =
    useEquipmentContext();
  const { PutAPI } = useApiContext();

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
  const [isModifyingEquipments, setIsModifyingEquipments] = useState(false);

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

  async function HandleUpdateEquipments(
    modifiedEquipments: EquipmentTypeProps[],
  ) {
    if (modifiedEquipments.length === 0) return;
    setIsModifyingEquipments(true);
    const editedEquipments = await PutAPI(
      "/equipment/multi",
      {
        equipments: modifiedEquipments.map((eq) => {
          return {
            equipmentId: eq.id,
            initialRotation: Number(eq.initialRotation),
            finalRotation: Number(eq.finalRotation),
            lubrication: eq.lubrication,
            power: Number(eq.power),
            operationTemperature: Number(eq.operationTemperature),
            mainComponent: eq.mainComponent,
            RPM: Number(eq.RPM),
            innerDiameter: Number(eq.innerDiameter),
            DN: Number(eq.DN),
            newPhotos: [],
            removedPhotos: [],
          };
        }),
      },
      true,
    );
    if (editedEquipments.status === 200) {
      toast.success("Equipamentos atualizados com sucesso");
      await GetAllData(); // Refresh all data
      setSelectedEquipmentStep(3);
    } else {
      toast.error("Erro ao atualizar Equipamentos");
    }

    setIsModifyingEquipments(false);
  }

  const HandleNextStep = () => {
    // 1. flatten everything
    const currentEquipments: EquipmentTypeProps[] = equipmentData || [];

    // 2. your original list from context
    const original = originalEquipments || [];

    const modifiedEquipments = currentEquipments.filter((eq) => {
      const o = original.find((o) => o.position === eq.position);

      return (
        o &&
        (o.initialRotation !== eq.initialRotation ||
          o.finalRotation !== eq.finalRotation ||
          o.lubrication !== eq.lubrication ||
          o.power !== eq.power ||
          o.operationTemperature !== eq.operationTemperature ||
          o.mainComponent !== eq.mainComponent ||
          o.RPM !== eq.RPM ||
          o.innerDiameter !== eq.innerDiameter ||
          o.DN !== eq.DN)
      );
    });
    // 4. dispatch your three API calls exactly as before
    const promises: Promise<void>[] = [];
    if (modifiedEquipments.length)
      promises.push(HandleUpdateEquipments(modifiedEquipments));
    // 5. step on
    if (promises.length) {
      Promise.all(promises).then(() => setSelectedEquipmentStep(3));
    } else {
      setSelectedEquipmentStep(3);
    }
  };

  useEffect(() => {
    setEquipmentPages(
      Math.ceil((selectedSector?.equipments?.length || 0) / 12),
    );
  }, [selectedSector?.equipments?.length]);

  const isEquipmentProductFullyFilled = (data: EquipmentTypeProps) => {
    return (
      data.initialRotation &&
      data.finalRotation &&
      data.lubrication &&
      data.power &&
      data.operationTemperature &&
      data.mainComponent &&
      data.RPM &&
      data.innerDiameter
    );
  };

  return (
    <AccordionItem value="2" onClick={() => setSelectedEquipmentStep(2)}>
      <AccordionTrigger arrow>
        <div className="flex w-full items-center justify-between">
          <div className="text-primary flex items-center gap-2 text-base font-bold md:gap-4 md:text-2xl">
            <span>1.2</span>
            <div className="flex flex-col">
              <span className="leading-6">Especificações Técnicas</span>
            </div>
          </div>
          {selectedEquipmentStep === 2 && (
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
                  HandleNextStep();
                }}
                className={cn(
                  "bg-primary pointer-events-none flex h-6 cursor-not-allowed items-center gap-2 rounded-full px-2 py-2 text-sm font-semibold text-white opacity-50 md:h-10 md:px-4",
                  equipmentData.find(isEquipmentProductFullyFilled) &&
                    "pointer-events-auto cursor-auto opacity-100",
                )}
              >
                {isModifyingEquipments ? (
                  <>
                    <span className="hidden md:block">Salvando...</span>
                    <Loader2 className="h-4 animate-spin md:h-8" />
                  </>
                ) : (
                  <>
                    <span className="hidden md:block">Avançar 1.3</span>
                    <ArrowRight className="h-4 md:h-8" />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div
          className={cn(
            "grid grid-cols-4 gap-2 border-t border-neutral-300 p-2 md:gap-4 md:p-4",
            selectedEquipment && "grid-cols-3",
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
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-primary text-xs md:text-sm">
                      Rot. In
                    </span>
                    <input
                      type="number"
                      className="h-10 w-full rounded-2xl bg-white p-2 px-2 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] placeholder:text-neutral-300 focus:outline-none md:h-12 md:px-4"
                      placeholder="Rotação de Entrada"
                      value={
                        equipmentData.find(
                          (eq) => eq.id === selectedEquipment.id,
                        )?.initialRotation
                      }
                      onChange={(e) =>
                        handleInputChange(
                          Number(
                            equipmentData
                              .find((eq) => eq.id === selectedEquipment.id)
                              ?.position?.split(".")[2],
                          ) - 1,
                          "initialRotation",
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-primary text-xs md:text-sm">
                      Rot. Out
                    </span>
                    <input
                      type="number"
                      className="h-10 w-full rounded-2xl bg-white p-2 px-2 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] placeholder:text-neutral-300 focus:outline-none md:h-12 md:px-4"
                      placeholder="Rotação de Saída"
                      value={
                        equipmentData.find(
                          (eq) => eq.id === selectedEquipment.id,
                        )?.finalRotation
                      }
                      onChange={(e) =>
                        handleInputChange(
                          Number(
                            equipmentData
                              .find((eq) => eq.id === selectedEquipment.id)
                              ?.position?.split(".")[2],
                          ) - 1,
                          "finalRotation",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-primary text-xs md:text-sm">
                    Sistema de Lubrificação
                  </span>
                  <input
                    type="text"
                    className="h-10 w-full rounded-2xl bg-white p-2 px-2 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] placeholder:text-neutral-300 focus:outline-none md:h-12 md:px-4"
                    placeholder="Lubrificante"
                    value={
                      equipmentData.find((eq) => eq.id === selectedEquipment.id)
                        ?.lubrication
                    }
                    onChange={(e) =>
                      handleInputChange(
                        Number(
                          equipmentData
                            .find((eq) => eq.id === selectedEquipment.id)
                            ?.position?.split(".")[2],
                        ) - 1,
                        "lubrication",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-primary text-xs md:text-sm">
                    Potência
                  </span>
                  <input
                    type="number"
                    className="h-10 w-full rounded-2xl bg-white p-2 px-2 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] placeholder:text-neutral-300 focus:outline-none md:h-12 md:px-4"
                    placeholder="Potência do Equipamento"
                    value={
                      equipmentData.find((eq) => eq.id === selectedEquipment.id)
                        ?.power
                    }
                    onChange={(e) =>
                      handleInputChange(
                        Number(
                          equipmentData
                            .find((eq) => eq.id === selectedEquipment.id)
                            ?.position?.split(".")[2],
                        ) - 1,
                        "power",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-primary text-xs md:text-sm">
                    Temperatura de Operação
                  </span>
                  <input
                    type="number"
                    className="h-10 w-full rounded-2xl bg-white p-2 px-2 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] placeholder:text-neutral-300 focus:outline-none md:h-12 md:px-4"
                    placeholder="Temperatura de Operação"
                    value={
                      equipmentData.find((eq) => eq.id === selectedEquipment.id)
                        ?.operationTemperature
                    }
                    onChange={(e) =>
                      handleInputChange(
                        Number(
                          equipmentData
                            .find((eq) => eq.id === selectedEquipment.id)
                            ?.position?.split(".")[2],
                        ) - 1,
                        "operationTemperature",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-primary text-xs md:text-sm">
                    Tipo de Componente Principal
                  </span>
                  <input
                    type="text"
                    className="h-10 w-full rounded-2xl bg-white p-2 px-2 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] placeholder:text-neutral-300 focus:outline-none md:h-12 md:px-4"
                    placeholder="Componente Principal"
                    value={
                      equipmentData.find((eq) => eq.id === selectedEquipment.id)
                        ?.mainComponent
                    }
                    onChange={(e) =>
                      handleInputChange(
                        Number(
                          equipmentData
                            .find((eq) => eq.id === selectedEquipment.id)
                            ?.position?.split(".")[2],
                        ) - 1,
                        "mainComponent",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-primary text-xs md:text-sm">RPM</span>
                  <input
                    type="number"
                    className="h-10 w-full rounded-2xl bg-white p-2 px-2 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] placeholder:text-neutral-300 focus:outline-none md:h-12 md:px-4"
                    placeholder="RPM"
                    value={
                      equipmentData.find((eq) => eq.id === selectedEquipment.id)
                        ?.RPM
                    }
                    onChange={(e) =>
                      handleInputChange(
                        Number(
                          equipmentData
                            .find((eq) => eq.id === selectedEquipment.id)
                            ?.position?.split(".")[2],
                        ) - 1,
                        "RPM",
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-primary text-xs md:text-sm">
                    Diâmetro Interno
                  </span>
                  <input
                    type="number"
                    className="h-10 w-full rounded-2xl bg-white p-2 px-2 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] placeholder:text-neutral-300 focus:outline-none md:h-12 md:px-4"
                    placeholder="Diâmetro Interno"
                    value={
                      equipmentData.find((eq) => eq.id === selectedEquipment.id)
                        ?.innerDiameter
                    }
                    onChange={(e) =>
                      handleInputChange(
                        Number(
                          equipmentData
                            .find((eq) => eq.id === selectedEquipment.id)
                            ?.position?.split(".")[2],
                        ) - 1,
                        "innerDiameter",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-primary text-xs md:text-sm">
                    Fator DN
                  </span>
                  <input
                    className="h-10 w-full rounded-2xl bg-white p-2 px-2 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] placeholder:text-neutral-300 focus:outline-none md:h-12 md:px-4"
                    placeholder="Fator DN"
                    value={
                      Number(
                        equipmentData.find(
                          (eq) => eq.id === selectedEquipment.id,
                        )?.innerDiameter,
                      ) *
                        Number(
                          equipmentData.find(
                            (eq) => eq.id === selectedEquipment.id,
                          )?.RPM,
                        ) || 0
                    }
                    onChange={(e) =>
                      handleInputChange(
                        Number(
                          equipmentData
                            .find((eq) => eq.id === selectedEquipment.id)
                            ?.position?.split(".")[2],
                        ) - 1,
                        "DN",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="flex h-10 items-end justify-end gap-4 md:h-full">
                  <button
                    onClick={() => setSelectedEquipment(null)}
                    className="h-10 w-full rounded-xl bg-green-500 p-2 text-sm text-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] md:h-12 md:w-2/5"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-span-4 flex flex-col gap-2">
                <span>
                  Texto para Explicar que deverá selecionar um Equipamento antes
                  de preencher as Especificações Técnicas:
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
                .sort(sortByPosition)
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
                                sector.position === item.position?.slice(0, 3),
                            ) as SectorProps,
                        );
                        setSelectedEquipment(item);
                      }}
                      className={cn(
                        "relative flex h-10 cursor-pointer items-center justify-start rounded-2xl md:h-12",
                        isEquipmentProductFullyFilled(item) && "bg-primary",
                      )}
                    >
                      <span
                        className={cn(
                          "bg-primary/20 text-primary flex h-10 w-10 items-center justify-center rounded-2xl p-1 font-bold md:h-12 md:w-12",
                          isEquipmentProductFullyFilled(item) &&
                            "bg-white/20 text-white",
                        )}
                      >
                        {item.position}
                      </span>
                      <input
                        className={cn(
                          "peer transparent absolute right-0 h-full w-[calc(100%-2.5rem)] px-2 text-xs placeholder:text-neutral-300 focus:outline-none md:w-[calc(100%-3rem)] md:px-4 md:text-sm",
                          isEquipmentProductFullyFilled(item) && "text-white",
                        )}
                        placeholder="Nome da Área"
                        value={item.name}
                        disabled
                      />

                      <div
                        className={cn(
                          "absolute left-0 z-10 h-full w-full rounded-2xl shadow-[0px_2px_7px_rgba(0,0,0,0.15)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.5)]",
                          isEquipmentProductFullyFilled(item) &&
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
