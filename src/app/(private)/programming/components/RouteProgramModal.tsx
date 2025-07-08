import { Workers } from "@/@staticData/os";
import { PlanningProps } from "@/@types/planning";
import { ProgrammingProps } from "@/@types/programming";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ChevronLeft, Loader2 } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import Select, { StylesConfig } from "react-select";
import { z } from "zod";
import { ModalPlanningTable } from "./modal-planning-table";

const colorStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    borderRadius: "8px",
    borderColor: "#a1a1aa",
  }),
  option: (styles) => {
    return {
      ...styles,
      color: "#3f3f46",
      background: "#fff",
      ":hover": {
        background: "#ed684220",
        color: "#000",
      },
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    backgroundColor: "#ed6842",
    color: "#fff",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    backgroundColor: "#ed6842",
    color: "#fff",
  }),
};

const FormSchema = z.object({
  workers: z
    .array(
      z.object({
        value: z.string().min(1, "Selecione um trabalhador"),
        label: z.string(),
      }),
    )
    .min(1, "Selecione ao menos um trabalhador"),
  selectedDate: z.date(),
});

interface RouteProgramModalProps {
  open: boolean;
  onClose: () => void;
  selectedRoute: ProgrammingProps;
}

export function RouteProgramModal({
  open,
  onClose,
  selectedRoute,
}: RouteProgramModalProps) {
  const [isCreating] = useState(false);
  const [seeSummary, setSeeSummary] = useState(false);
  const [selectedOsStep, setSelectedOsStep] = useState(1);
  const [planningList, setPlanningList] = useState<PlanningProps[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      workers: selectedRoute.workers,
      selectedDate: selectedRoute.startDate,
    },
  });

  const useFormSteps = (form: UseFormReturn<z.infer<typeof FormSchema>>) => {
    const [activeStep, setActiveStep] = useState(0);

    const stepFields = {
      0: ["workers"] as const,
      1: ["selectedDate"] as const,
    };

    const validateStep = async (step: number) => {
      const fields = stepFields[step as keyof typeof stepFields];
      if (!fields) return true;
      return await form.trigger(fields);
    };

    return { activeStep, validateStep, setActiveStep };
  };

  const { validateStep } = useFormSteps(form);

  async function HandleCreateEquipment() {
    // First validate step 0 (workers)
    const isStep0Valid = await validateStep(0);
    if (!isStep0Valid) {
      const errors = form.formState.errors;

      const fieldLabels = {
        workers: "Responsáveis",
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const getErrorMessage = (error: any): string | null => {
        if (typeof error === "object" && error !== null) {
          if (error.message) return error.message;

          for (const key in error) {
            if (error[key]?.message) {
              return error[key].message;
            }
          }
        }
        return null;
      };

      for (const [fieldKey, label] of Object.entries(fieldLabels)) {
        const fieldError = errors[fieldKey as keyof typeof errors];
        const errorMessage = getErrorMessage(fieldError);

        if (errorMessage) {
          return toast.error(`${label}: ${errorMessage}`);
        }
      }

      return toast.error("Por favor, corrija os erros no formulário.");
    }

    const selectedOs = planningList.filter((os) => os.selected);
    if (selectedOs.length === 0) {
      return toast.error("Por favor, selecione ao menos uma OS.");
    }

    // If we're already in summary view, validate selectedDate before creating
    if (seeSummary) {
      const isStep1Valid = await validateStep(1);
      if (!isStep1Valid) {
        return toast.error("Por favor, selecione uma data.");
      }
      // Here you would actually create the equipment/route
      // For now, just show success
      toast.success("Programação criada com sucesso!");
      onClose();
      return;
    }

    // If not in summary, move to summary view
    setSeeSummary(true);
  }

  const test = (planningList: PlanningProps[]) => {
    const totalHours = planningList
      .filter((os) => os.selected)
      .reduce((total, os) => {
        return (
          (total + moment(os.endDate).diff(moment(os.startDate), "minutes")) /
          60
        );
      }, 0);

    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    return `${hours}h:${minutes.toString().padStart(2, "0")}m`;
  };

  useEffect(() => {
    setPlanningList(selectedRoute.selectedOss);
  }, [selectedRoute]);

  useEffect(() => {
    if (open && selectedRoute) {
      form.reset({
        workers: selectedRoute.workers,
        selectedDate: selectedRoute.startDate,
      });
    }
  }, [open, form]);

  useEffect(() => {
    if (!open) {
      form.reset({
        workers: [],
        selectedDate: new Date(),
      });
    }
  }, [open, form]);

  if (!selectedRoute) return;

  return (
    <>
      <Modal isOpen={open} close={onClose}>
        {seeSummary ? (
          <div className="relative flex flex-col gap-4 pt-4">
            <ChevronLeft
              onClick={() => setSeeSummary(false)}
              className="absolute top-0 left-0"
            />
            <Accordion
              type="single"
              defaultValue="1"
              className="mt-4 w-full space-y-3.5"
              value={String(selectedOsStep)}
              onValueChange={(value) => setSelectedOsStep(Number(value))}
            >
              <AccordionItem
                className="rounded-lg border border-zinc-400 shadow-none"
                value="1"
                onClick={() => setSelectedOsStep(1)}
              >
                <AccordionTrigger arrow>
                  <div className="flex w-full items-center justify-between">
                    <div className="text-primary flex items-center gap-2 text-base font-bold md:gap-4 md:text-2xl">
                      <div className="flex flex-col">
                        <span className="leading-6">Equipamentos</span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1">
                    {planningList
                      .filter((os) => os.selected)
                      .map((os) => (
                        <span key={os.id}>{os.eqp.name}</span>
                      ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                className="rounded-lg border border-zinc-400 shadow-none"
                value="2"
                onClick={() => setSelectedOsStep(2)}
              >
                <AccordionTrigger arrow>
                  <div className="flex w-full items-center justify-between">
                    <div className="text-primary flex items-center gap-2 text-base font-bold md:gap-4 md:text-2xl">
                      <div className="flex flex-col">
                        <span className="leading-6">Materiais</span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1">
                    {planningList
                      .filter((os) => os.selected)
                      .map((os) =>
                        os.eqp.materials.map((m) => (
                          <span key={m.id}>{m.name}</span>
                        )),
                      )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                className="rounded-lg border border-zinc-400 shadow-none"
                value="3"
                onClick={() => setSelectedOsStep(3)}
              >
                <AccordionTrigger arrow>
                  <div className="flex w-full items-center justify-between">
                    <div className="text-primary flex items-center gap-2 text-base font-bold md:gap-4 md:text-2xl">
                      <div className="flex flex-col">
                        <span className="leading-6">Ferramentas</span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1">
                    {planningList
                      .filter((os) => os.selected)
                      .map((os) =>
                        os.eqp.tools.map((t) => (
                          <span key={t.id}>{t.name}</span>
                        )),
                      )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                className="rounded-lg border border-zinc-400 shadow-none"
                value="4"
                onClick={() => setSelectedOsStep(4)}
              >
                <AccordionTrigger arrow>
                  <div className="flex w-full items-center justify-between">
                    <div className="text-primary flex items-center gap-2 text-base font-bold md:gap-4 md:text-2xl">
                      <div className="flex flex-col">
                        <span className="leading-6">
                          Tempo Estimado de Conclusão
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1">
                    <span>Tempo total estimado: {test(planningList)}</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                className="rounded-lg border border-zinc-400 shadow-none"
                value="5"
                onClick={() => setSelectedOsStep(5)}
              >
                <AccordionTrigger arrow>
                  <div className="flex w-full items-center justify-between">
                    <div className="text-primary flex items-center gap-2 text-base font-bold md:gap-4 md:text-2xl">
                      <div className="flex flex-col">
                        <span className="leading-6">Responsáveis</span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1">
                    {form.getValues("workers").map((w) => (
                      <span key={w.value}>{w.label}</span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-primary flex w-full items-center justify-center gap-2 rounded-md p-2 font-semibold text-white">
                  <span>
                    {form.watch("selectedDate")
                      ? moment(form.watch("selectedDate")).format("DD/MM/YYYY")
                      : "Selecionar dia"}
                  </span>
                  <ChevronDown />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-[99999]">
                <Calendar
                  mode="single"
                  selected={form.watch("selectedDate")}
                  onSelect={(date) => {
                    if (date) {
                      form.setValue("selectedDate", date);
                    }
                  }}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <>
            <Label className="text-2xl font-semibold">
              Editar Programação de Rota
            </Label>
            <div className="mt-6 h-full">
              <Form {...form}>
                <div className="h-full flex-1 space-y-4">
                  <FormField
                    key="workers"
                    control={form.control}
                    name="workers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-text-100">
                          Responsáveis
                        </FormLabel>
                        <FormControl>
                          <Select
                            styles={colorStyles}
                            className="react-select text-white"
                            placeholder="Selecione os responsáveis"
                            classNamePrefix="select"
                            isMulti
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                            options={Workers.map((tag) => {
                              return {
                                value: tag.id,
                                label: tag.name,
                              };
                            })}
                            value={field.value}
                            noOptionsMessage={() => "Nenhum nome encontrada"}
                          />
                        </FormControl>
                        <FormMessage className="text-rose-500" />
                      </FormItem>
                    )}
                  />
                  {form.getValues("workers").length > 0 && (
                    <ModalPlanningTable
                      selectedWorkers={form.getValues("workers")}
                      planningList={planningList}
                      setPlanningList={setPlanningList}
                    />
                  )}
                </div>
              </Form>
            </div>
          </>
        )}
        <div className="my-2 flex flex-wrap gap-2">
          <Button
            type="button"
            disabled={isCreating}
            onClick={HandleCreateEquipment}
            className="flex-1"
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : seeSummary ? (
              "Editar Programação"
            ) : form.getValues("workers").length > 0 ? (
              "Ver Resumo da Programação"
            ) : (
              "Selecione ao menos um responsável"
            )}
          </Button>
        </div>
      </Modal>
    </>
  );
}
