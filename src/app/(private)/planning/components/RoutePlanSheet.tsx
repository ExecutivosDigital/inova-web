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
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import CreatableSelect from "react-select/creatable";
import { z } from "zod";

const optionsSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const FormSchema = z.object({
  title: z
    .string()
    .min(1, "Responsável é obrigatório")
    .min(2, "Responsável deve ter pelo menos 2 caracteres."),
  description: z.string().optional(),
  attendees: z
    .array(optionsSchema)
    .min(1, { message: "Selecione pelo menos um participante" }),
  date: z.date(),
});

interface RoutePlanSheetProps {
  open: boolean;
  onClose: () => void;
  selectedDate?: Date | null;
}

export function RoutePlanSheet({
  open,
  onClose,
  selectedDate,
}: RoutePlanSheetProps) {
  const [isCreating, setIsCreating] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      attendees: [],
      date: selectedDate || new Date(),
    },
  });

  const useFormSteps = (form: UseFormReturn<z.infer<typeof FormSchema>>) => {
    const [activeStep, setActiveStep] = useState(0);

    const stepFields = {
      0: ["title", "description", "attendees", "date"] as const,
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

      // Define field labels with proper typing
      const fieldLabels: Record<keyof z.infer<typeof FormSchema>, string> = {
        title: "Título",
        description: "Descrição",
        attendees: "Participantes",
        date: "Data",
      };

      // Get first error with type safety
      const firstErrorField = Object.keys(
        errors,
      )[0] as keyof typeof fieldLabels;
      const firstError = errors[firstErrorField];

      if (firstError?.message && firstErrorField in fieldLabels) {
        const fieldLabel = fieldLabels[firstErrorField];
        return toast.error(`${fieldLabel}: ${firstError.message}`);
      }

      return toast.error("Por favor, corrija os erros no formulário.");
    }

    setIsCreating(true);
    toast.success("Planejamento criado com sucesso!");
    return setIsCreating(false);
  }

  useEffect(() => {
    if (selectedDate && open) {
      form.reset({
        title: "",
        description: "",
        attendees: [],
        date: selectedDate,
      });
    }
  }, [selectedDate, open, form]);

  useEffect(() => {
    if (!open) {
      form.reset({
        title: "",
        description: "",
        attendees: [],
        date: selectedDate || new Date(),
      });
    }
  }, [open, form]);

  return (
    <>
      <Sheet open={open}>
        <SheetContent
          onPointerDownOutside={onClose}
          onClose={onClose}
          className="no-scrollbar h-screen px-0"
        >
          <ScrollArea className="h-full">
            <SheetHeader className="px-6">
              <SheetTitle>Novo Planejamento de Rota</SheetTitle>
            </SheetHeader>
            <div className="mt-6 h-full">
              <Form {...form}>
                <div className="h-[calc(100vh-200px)]">
                  <ScrollArea className="h-full">
                    <div className="space-y-4 px-6 pb-5">
                      <FormField
                        key="title"
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Título"
                                {...field}
                                disabled={isCreating}
                                className={cn("", {
                                  "border-destructive focus:border-destructive text-text-100 rounded-md":
                                    form.formState.errors.title,
                                })}
                                autoComplete="off"
                              />
                            </FormControl>
                            <FormMessage className="text-rose-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        key="description"
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Descrição"
                                {...field}
                                disabled={isCreating}
                                className={cn("", {
                                  "border-destructive focus:border-destructive text-text-100 rounded-md":
                                    form.formState.errors.description,
                                })}
                                autoComplete="off"
                              />
                            </FormControl>
                            <FormMessage className="text-rose-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data e Hora de Início *</FormLabel>
                            <div className="flex gap-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <FormControl>
                                    <div className="flex h-9 w-full items-center justify-between rounded-lg border border-zinc-400 px-2">
                                      {field.value
                                        ? moment(
                                            field.value,
                                            "dd/MM/yyyy",
                                          ).format("DD/MM/YYYY")
                                        : "Selecione a data"}
                                      <CalendarIcon className="h-4 w-4" />
                                    </div>
                                  </FormControl>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange} // Directly controlled by form
                                    disabled={(date) => date < new Date()}
                                  />
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="attendees"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Participantes</FormLabel>
                            <FormControl>
                              <CreatableSelect
                                {...field}
                                isMulti
                                placeholder="Selecione participantes"
                                onCreateOption={(inputValue) => {
                                  const newOption = {
                                    label: inputValue,
                                    value: inputValue
                                      .toLowerCase()
                                      .replace(/\s+/g, "."),
                                  };
                                  field.onChange([...field.value, newOption]);
                                }}
                              />
                            </FormControl>
                            <FormMessage className="text-rose-500" />
                          </FormItem>
                        )}
                      />
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
                      "Salvar Planejamento de Rota"
                    )}
                  </Button>
                </div>{" "}
              </Form>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
