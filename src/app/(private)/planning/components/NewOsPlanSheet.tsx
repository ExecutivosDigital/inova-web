import { Areas, Equipments, Services, Workers } from "@/@staticData/os";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  Check,
  CheckCheck,
  ChevronDown,
  Loader2,
} from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import Select, { StylesConfig } from "react-select";
import { z } from "zod";

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
  area: z.object({
    id: z.string().min(1, "Selecione uma área"),
    name: z.string(),
  }),
  eqp: z.object({
    id: z.string().min(1, "Selecione um equipamento"),
    name: z.string(),
  }),
  service: z.object({
    id: z.string().min(1, "Selecione um serviço"),
    name: z.string(),
  }),
  startDate: z
    .date({
      required_error: "Selecione uma data e hora",
    })
    .refine(
      (date) => {
        return date > new Date();
      },
      {
        message: "A data deve ser no futuro",
      },
    ),
  endDate: z
    .date({
      required_error: "Selecione uma data e hora",
    })
    .refine(
      (date) => {
        return date > new Date();
      },
      {
        message: "A data deve ser no futuro",
      },
    ),
  workers: z
    .array(
      z.object({
        value: z.string().min(1, "Selecione um trabalhador"),
        label: z.string(),
      }),
    )
    .min(1, "Selecione ao menos um trabalhador"),
});

interface NewOsPlanSheetProps {
  open: boolean;
  onClose: () => void;
}

export function NewOsPlanSheet({ open, onClose }: NewOsPlanSheetProps) {
  const [isCreating, setIsCreating] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      area: { id: "", name: "" },
      eqp: { id: "", name: "" },
      service: { id: "", name: "" },
      startDate: moment().add(1, "hour").startOf("hour").toDate(),
      endDate: moment().add(2, "hour").startOf("hour").toDate(),
      workers: [],
    },
  });

  const useFormSteps = (form: UseFormReturn<z.infer<typeof FormSchema>>) => {
    const [activeStep, setActiveStep] = useState(0);

    const stepFields = {
      0: ["area", "eqp", "service", "startDate", "endDate", "workers"] as const,
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
    const isValid = await validateStep(0);

    if (!isValid) {
      const errors = form.formState.errors;

      const fieldLabels = {
        area: "Área",
        eqp: "Equipamentos",
        service: "Serviços",
        startDate: "Data de Início",
        endDate: "Data de Término",
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

    setIsCreating(true);
    toast.success("Planejamento criado com sucesso!");
    return setIsCreating(false);
  }

  useEffect(() => {
    if (open) {
      form.reset({
        area: { id: "", name: "" },
        eqp: { id: "", name: "" },
        service: { id: "", name: "" },
        startDate: moment().add(1, "hour").startOf("hour").toDate(),
        endDate: moment().add(2, "hour").startOf("hour").toDate(),
        workers: [],
      });
    }
  }, [open, form]);

  useEffect(() => {
    if (!open) {
      form.reset({
        area: { id: "", name: "" },
        eqp: { id: "", name: "" },
        service: { id: "", name: "" },
        startDate: moment().add(1, "hour").startOf("hour").toDate(),
        endDate: moment().add(2, "hour").startOf("hour").toDate(),
        workers: [],
      });
    }
  }, [open, form]);

  return (
    <>
      <Sheet open={open}>
        <SheetContent
          onPointerDownOutside={onClose}
          onClose={onClose}
          className="no-scrollbar h-screen px-0 lg:max-w-[800px]"
        >
          <SheetHeader className="px-6">
            <SheetTitle>Planejamento de OS</SheetTitle>
          </SheetHeader>
          <div className="flex w-full">
            <ScrollArea className="h-full w-1/2">
              <div className="mt-6 flex h-full flex-col">
                <Form {...form}>
                  <div className="h-[calc(100vh-200px)]">
                    <ScrollArea className="h-full">
                      <div className="space-y-4 px-6 pb-5">
                        <FormField
                          key="area"
                          control={form.control}
                          name="area"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Área</FormLabel>
                              <FormControl>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <div className="flex cursor-pointer items-center justify-between rounded-lg border border-zinc-400 px-2 py-1">
                                      <span
                                        className={cn(
                                          field.value.name === "" &&
                                            "text-zinc-400",
                                        )}
                                      >
                                        {field.value.name ||
                                          "Selecione uma Área"}
                                      </span>
                                      <ChevronDown />
                                    </div>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="z-[9999]"
                                  >
                                    <Command
                                      className="z-[99999]"
                                      filter={(value, search) => {
                                        if (
                                          value
                                            .toLowerCase()
                                            .normalize("NFD")
                                            .replace(/[\u0300-\u036f]/g, "")
                                            .includes(search.toLowerCase())
                                        )
                                          return 1;
                                        return 0;
                                      }}
                                    >
                                      <CommandInput placeholder="Pesquisar..." />
                                      <CommandEmpty>
                                        Não encontrado.
                                      </CommandEmpty>
                                      {Areas.sort((a, b) =>
                                        a.name.localeCompare(b.name),
                                      ).map((area, index) => (
                                        <CommandItem
                                          key={`area-${index}`}
                                          value={area.name}
                                          onSelect={() => {
                                            field.onChange({
                                              id: area.id,
                                              name: area.name,
                                            });
                                          }}
                                          className={cn(
                                            "hover:bg-primary/20 pointer-events-auto flex w-full cursor-pointer items-center justify-between transition duration-200",
                                            field.value.name === area.name &&
                                              "bg-primary/20",
                                          )}
                                        >
                                          {area.name}
                                          <Check
                                            className={cn("mr-2 h-4 w-4", {
                                              "opacity-100":
                                                field.value.name === area.name,
                                              "opacity-0":
                                                field.value.name !== area.name,
                                            })}
                                          />
                                        </CommandItem>
                                      ))}
                                    </Command>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </FormControl>
                              {form.formState.errors.area?.id && (
                                <p className="mt-1 text-sm text-rose-500">
                                  {form.formState.errors.area.id.message}
                                </p>
                              )}
                            </FormItem>
                          )}
                        />

                        <FormField
                          key="eqp"
                          control={form.control}
                          name="eqp"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Equipamento</FormLabel>
                              <FormControl>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <div className="flex cursor-pointer items-center justify-between rounded-lg border border-zinc-400 px-2 py-1">
                                      <span
                                        className={cn(
                                          field.value.name === "" &&
                                            "text-zinc-400",
                                        )}
                                      >
                                        {field.value.name ||
                                          "Selecione um equipamento"}
                                      </span>
                                      <ChevronDown />
                                    </div>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="z-[9999]"
                                  >
                                    <Command
                                      className="z-[99999]"
                                      filter={(value, search) => {
                                        if (
                                          value
                                            .toLowerCase()
                                            .normalize("NFD")
                                            .replace(/[\u0300-\u036f]/g, "")
                                            .includes(search.toLowerCase())
                                        )
                                          return 1;
                                        return 0;
                                      }}
                                    >
                                      <CommandInput placeholder="Pesquisar..." />
                                      <CommandEmpty>
                                        Não encontrado.
                                      </CommandEmpty>
                                      {Equipments.sort((a, b) =>
                                        a.name.localeCompare(b.name),
                                      ).map((equipment, index) => (
                                        <CommandItem
                                          key={`equipment-${index}`}
                                          value={equipment.name}
                                          onSelect={() => {
                                            field.onChange({
                                              id: equipment.id,
                                              name: equipment.name,
                                            });
                                          }}
                                          className={cn(
                                            "hover:bg-primary/20 pointer-events-auto flex w-full cursor-pointer items-center justify-between transition duration-200",
                                            field.value.name ===
                                              equipment.name && "bg-primary/20",
                                          )}
                                        >
                                          {equipment.name}
                                          <Check
                                            className={cn("mr-2 h-4 w-4", {
                                              "opacity-100":
                                                field.value.name ===
                                                equipment.name,
                                              "opacity-0":
                                                field.value.name !==
                                                equipment.name,
                                            })}
                                          />
                                        </CommandItem>
                                      ))}
                                    </Command>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </FormControl>
                              {form.formState.errors.eqp?.id && (
                                <p className="mt-1 text-sm text-rose-500">
                                  {form.formState.errors.eqp.id.message}
                                </p>
                              )}
                            </FormItem>
                          )}
                        />

                        <FormField
                          key="service"
                          control={form.control}
                          name="service"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Serviço</FormLabel>
                              <FormControl>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <div className="flex cursor-pointer items-center justify-between rounded-lg border border-zinc-400 px-2 py-1">
                                      <span
                                        className={cn(
                                          field.value.name === "" &&
                                            "text-zinc-400",
                                        )}
                                      >
                                        {field.value.name ||
                                          "Selecione um serviço"}
                                      </span>
                                      <ChevronDown />
                                    </div>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="z-[9999]"
                                  >
                                    <Command
                                      className="z-[99999]"
                                      filter={(value, search) => {
                                        if (
                                          value
                                            .toLowerCase()
                                            .normalize("NFD")
                                            .replace(/[\u0300-\u036f]/g, "")
                                            .includes(search.toLowerCase())
                                        )
                                          return 1;
                                        return 0;
                                      }}
                                    >
                                      <CommandInput placeholder="Pesquisar..." />
                                      <CommandEmpty>
                                        Não encontrado.
                                      </CommandEmpty>
                                      {Services.sort((a, b) =>
                                        a.name.localeCompare(b.name),
                                      ).map((service, index) => (
                                        <CommandItem
                                          key={`service-${index}`}
                                          value={service.name}
                                          onSelect={() => {
                                            field.onChange({
                                              id: service.id,
                                              name: service.name,
                                            });
                                          }}
                                          className={cn(
                                            "hover:bg-primary/20 pointer-events-auto flex w-full cursor-pointer items-center justify-between transition duration-200",
                                            field.value.name === service.name &&
                                              "bg-primary/20",
                                          )}
                                        >
                                          {service.name}
                                          <Check
                                            className={cn("mr-2 h-4 w-4", {
                                              "opacity-100":
                                                field.value.name ===
                                                service.name,
                                              "opacity-0":
                                                field.value.name !==
                                                service.name,
                                            })}
                                          />
                                        </CommandItem>
                                      ))}
                                    </Command>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </FormControl>
                              {form.formState.errors.service?.id && (
                                <p className="mt-1 text-sm text-rose-500">
                                  {form.formState.errors.service.id.message}
                                </p>
                              )}
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="startDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Data e Hora de Início *</FormLabel>
                              <div className="flex gap-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <FormControl>
                                      <div className="flex h-9 w-full items-center justify-between rounded-lg border border-zinc-400 px-2">
                                        {field.value
                                          ? moment(field.value).format(
                                              "DD/MM/YYYY HH:mm",
                                            )
                                          : "Selecione a data e hora"}
                                        <CalendarIcon className="h-4 w-4" />
                                      </div>
                                    </FormControl>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={(date) => {
                                        if (date) {
                                          const currentTime = field.value
                                            ? moment(field.value)
                                            : moment().startOf("hour");
                                          const newDateTime = moment(date)
                                            .hour(currentTime.hour())
                                            .minute(currentTime.minute())
                                            .toDate();
                                          field.onChange(newDateTime);
                                        }
                                      }}
                                      disabled={(date) => date < new Date()}
                                    />
                                    <div className="bg-primary/10 flex w-full items-center justify-between p-2 font-semibold">
                                      <span>Hora: </span>
                                      <input
                                        type="time"
                                        step="60"
                                        value={
                                          field.value
                                            ? moment(field.value).format(
                                                "HH:mm",
                                              )
                                            : "00:00"
                                        }
                                        onChange={(e) => {
                                          const [hours, minutes] =
                                            e.target.value.split(":");
                                          const currentDate = field.value
                                            ? moment(field.value)
                                            : moment();
                                          const newDateTime = currentDate
                                            .hour(parseInt(hours))
                                            .minute(parseInt(minutes))
                                            .second(0)
                                            .millisecond(0)
                                            .toDate();
                                          field.onChange(newDateTime);
                                        }}
                                        className="focus:border-primary focus:outline-primary focus:ring-primary bg-transparent"
                                      />
                                    </div>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              <FormMessage className="text-rose-500" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="endDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Data e Hora de Término *</FormLabel>
                              <div className="flex gap-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <FormControl>
                                      <div className="flex h-9 w-full items-center justify-between rounded-lg border border-zinc-400 px-2">
                                        {field.value
                                          ? moment(field.value).format(
                                              "DD/MM/YYYY HH:mm",
                                            )
                                          : "Selecione a data e hora"}
                                        <CalendarIcon className="h-4 w-4" />
                                      </div>
                                    </FormControl>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={(date) => {
                                        if (date) {
                                          const currentTime = field.value
                                            ? moment(field.value)
                                            : moment().startOf("hour");
                                          const newDateTime = moment(date)
                                            .hour(currentTime.hour())
                                            .minute(currentTime.minute())
                                            .toDate();
                                          field.onChange(newDateTime);
                                        }
                                      }}
                                      disabled={(date) => date < new Date()}
                                    />
                                    <div className="bg-primary/10 flex w-full items-center justify-between p-2 font-semibold">
                                      <span>Hora: </span>
                                      <input
                                        type="time"
                                        step="60"
                                        value={
                                          field.value
                                            ? moment(field.value).format(
                                                "HH:mm",
                                              )
                                            : "00:00"
                                        }
                                        onChange={(e) => {
                                          const [hours, minutes] =
                                            e.target.value.split(":");
                                          const currentDate = field.value
                                            ? moment(field.value)
                                            : moment();
                                          const newDateTime = currentDate
                                            .hour(parseInt(hours))
                                            .minute(parseInt(minutes))
                                            .second(0)
                                            .millisecond(0)
                                            .toDate();
                                          field.onChange(newDateTime);
                                        }}
                                        className="focus:border-primary focus:outline-primary focus:ring-primary bg-transparent"
                                      />
                                    </div>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              <FormMessage className="text-rose-500" />
                            </FormItem>
                          )}
                        />

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
                                  noOptionsMessage={() =>
                                    "Nenhum nome encontrada"
                                  }
                                />
                              </FormControl>
                              <FormMessage className="text-rose-500" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </ScrollArea>
                  </div>
                </Form>
              </div>
            </ScrollArea>
            <ScrollArea className="h-full w-1/2">
              <div className="mt-6 flex h-full flex-col">
                <Form {...form}>
                  <div className="h-[calc(100vh-200px)]">
                    <ScrollArea className="h-full">
                      <div className="space-y-4 px-6 pb-5">
                        <div className="space-y-2">
                          <Label>Lubrificante Necessário</Label>
                          <div className="bg-primary relative flex h-9 items-center justify-end rounded-lg px-2 md:px-4">
                            <input
                              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
                              placeholder="Nome do Material"
                              value="Lubrificante Tal"
                              readOnly
                            />
                            <CheckCheck className="h-4 text-white" />
                            <div className="absolute left-0 z-10 h-full w-full rounded-lg shadow-[0px_2px_7px_rgba(0,0,0,0.1)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.1)]" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Quantidade de Lubrificante</Label>
                          <div className="bg-primary relative flex h-9 items-center justify-end rounded-lg px-2 md:px-4">
                            <input
                              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
                              placeholder="Nome do Material"
                              value="Tanto de Lubrificante"
                              readOnly
                            />
                            <CheckCheck className="h-4 text-white" />
                            <div className="absolute left-0 z-10 h-full w-full rounded-lg shadow-[0px_2px_7px_rgba(0,0,0,0.1)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.1)]" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Prioridade</Label>
                          <div className="bg-primary relative flex h-9 items-center justify-end rounded-lg px-2 md:px-4">
                            <input
                              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
                              placeholder="Nome do Material"
                              value="Prioridade Tal"
                              readOnly
                            />
                            <CheckCheck className="h-4 text-white" />
                            <div className="absolute left-0 z-10 h-full w-full rounded-lg shadow-[0px_2px_7px_rgba(0,0,0,0.1)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.1)]" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Ferramentas</Label>
                          <div className="bg-primary relative flex h-9 items-center justify-end rounded-lg px-2 md:px-4">
                            <input
                              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
                              placeholder="Nome do Material"
                              value="Ferramentas Tais"
                              readOnly
                            />
                            <CheckCheck className="h-4 text-white" />
                            <div className="absolute left-0 z-10 h-full w-full rounded-lg shadow-[0px_2px_7px_rgba(0,0,0,0.1)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.1)]" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Tempo Estimado de Execução</Label>
                          <div className="bg-primary relative flex h-9 items-center justify-end rounded-lg px-2 md:px-4">
                            <input
                              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
                              placeholder="Nome do Material"
                              value="Tanto Tempo"
                              readOnly
                            />
                            <CheckCheck className="h-4 text-white" />
                            <div className="absolute left-0 z-10 h-full w-full rounded-lg shadow-[0px_2px_7px_rgba(0,0,0,0.1)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.1)]" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Equipe Necessária</Label>
                          <div className="bg-primary relative flex h-9 items-center justify-end rounded-lg px-2 md:px-4">
                            <input
                              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
                              placeholder="Nome do Material"
                              value="Não"
                              readOnly
                            />
                            <CheckCheck className="h-4 text-white" />
                            <div className="absolute left-0 z-10 h-full w-full rounded-lg shadow-[0px_2px_7px_rgba(0,0,0,0.1)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.1)]" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Sistema de Trabalho</Label>
                          <div className="bg-primary relative flex h-9 items-center justify-end rounded-lg px-2 md:px-4">
                            <input
                              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
                              placeholder="Nome do Material"
                              value="Sistema Tal"
                              readOnly
                            />
                            <CheckCheck className="h-4 text-white" />
                            <div className="absolute left-0 z-10 h-full w-full rounded-lg shadow-[0px_2px_7px_rgba(0,0,0,0.1)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.1)]" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Condição de Serviço</Label>
                          <div className="bg-primary relative flex h-9 items-center justify-end rounded-lg px-2 md:px-4">
                            <input
                              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
                              placeholder="Nome do Material"
                              value="Condição Tal"
                              readOnly
                            />
                            <CheckCheck className="h-4 text-white" />
                            <div className="absolute left-0 z-10 h-full w-full rounded-lg shadow-[0px_2px_7px_rgba(0,0,0,0.1)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.1)]" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Pontos de Lubrificação</Label>
                          <div className="bg-primary relative flex h-9 items-center justify-end rounded-lg px-2 md:px-4">
                            <input
                              className="peer transparent absolute left-0 h-full w-[calc(100%-2rem)] px-2 text-xs text-white placeholder:text-neutral-300 focus:outline-none md:px-4 md:text-sm"
                              placeholder="Nome do Material"
                              value="Pontos Tais"
                              readOnly
                            />
                            <CheckCheck className="h-4 text-white" />
                            <div className="absolute left-0 z-10 h-full w-full rounded-lg shadow-[0px_2px_7px_rgba(0,0,0,0.1)] transition duration-200 peer-focus:shadow-[0px_2px_7px_rgba(0,0,0,0.1)]" />
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </div>
                </Form>
              </div>
            </ScrollArea>
          </div>
          <div className="flex flex-wrap gap-2 px-6 pb-12">
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
              ) : (
                "Salvar Planejamento de OS"
              )}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
