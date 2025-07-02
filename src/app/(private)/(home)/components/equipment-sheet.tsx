import { DashboardEquipmentProps } from "@/@types/dashboard";
import { Button } from "@/components/ui/button";
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
import { Edit2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const FormSchema = z.object({
  eqp: z
    .string()
    .min(1, "Equipamento é obrigatório")
    .min(2, "Equipamento deve ter pelo menos 2 caracteres."),
  tag: z
    .string()
    .min(1, "TAG é obrigatório")
    .min(2, "TAG deve ter pelo menos 2 caracteres."),
  service: z
    .string()
    .min(1, "Serviço é obrigatório")
    .min(2, "Serviço deve ter pelo menos 2 caracteres."),
  worker: z
    .string()
    .min(1, "Responsável é obrigatório")
    .min(2, "Responsável deve ter pelo menos 2 caracteres.")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Responsável deve conter apenas letras"),
  consumption: z
    .string()
    .min(1, "Consumo é obrigatório")
    .min(2, "Consumo deve ter pelo menos 2 caracteres."),
  date: z.string().min(1, "Data é obrigatória"),
  status: z.string().min(1, "Status é obrigatório"),
  place: z.string().min(1, "Local é obrigatório"),
});

interface EquipmentSheetProps {
  open: boolean;
  onClose: () => void;
  selectedEquipment: DashboardEquipmentProps;
}

export function EquipmentSheet({
  open,
  onClose,
  selectedEquipment,
}: EquipmentSheetProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      eqp: "",
      tag: "",
      service: "",
      worker: "",
      consumption: "",
      date: "",
      status: "",
      place: "",
    },
  });

  const useFormSteps = (form: UseFormReturn<z.infer<typeof FormSchema>>) => {
    const [activeStep, setActiveStep] = useState(0);

    const stepFields = {
      0: [
        "eqp",
        "tag",
        "service",
        "worker",
        "consumption",
        "date",
        "status",
        "place",
      ] as const,
    };

    const validateStep = async (step: number) => {
      const fields = stepFields[step as keyof typeof stepFields];
      if (!fields) return true;
      return await form.trigger(fields);
    };

    return { activeStep, validateStep, setActiveStep };
  };

  const { validateStep } = useFormSteps(form);

  async function HandleEditEquipment() {
    const isValid = await validateStep(0);
    if (!isValid) {
      const errors = form.formState.errors;

      // Define field labels with proper typing
      const fieldLabels: Record<keyof z.infer<typeof FormSchema>, string> = {
        eqp: "Equipamento",
        tag: "TAG",
        service: "Serviço",
        worker: "Responsável",
        consumption: "Consumo",
        date: "Data",
        status: "Status",
        place: "Local",
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

    setIsEditing(true);

    try {
      const formData = form.getValues();
      console.log("Form data to submit:", formData);
      onClose();
    } catch (error) {
      console.error("Error updating Equipment:", error);
    } finally {
      setIsEditing(false);
    }
  }

  async function HandleDeleteEquipment() {
    if (!selectedEquipment) return;

    setIsDeleting(true);

    try {
      onClose();
    } catch (error) {
      console.error("Error deleting Equipment:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  useEffect(() => {
    if (selectedEquipment && open) {
      form.reset({
        eqp: selectedEquipment.eqp || "",
        tag: selectedEquipment.tag || "",
        service: selectedEquipment.service || "",
        worker: selectedEquipment.worker || "",
        consumption: selectedEquipment.consumption || "",
        date: selectedEquipment.date || "",
        status: selectedEquipment.status || "",
        place: selectedEquipment.place || "",
      });
    }
  }, [selectedEquipment, open, form]);

  useEffect(() => {
    if (!open) {
      form.reset({
        eqp: "",
        tag: "",
        service: "",
        worker: "",
        consumption: "",
        date: "",
        status: "",
        place: "",
      });
    }
  }, [open, form]);

  return (
    <>
      <Sheet open={open}>
        <SheetContent
          onPointerDownOutside={onClose}
          onClose={onClose}
          className="h-screen px-0"
        >
          <SheetHeader className="flex-row items-center justify-between px-6">
            <SheetTitle>
              {selectedEquipment
                ? `Equipamento: ${selectedEquipment.tag}`
                : "Novo Equipamento"}
            </SheetTitle>
            <button
              onClick={() => setIsEditable(!isEditable)}
              className={cn(
                "border-default-500 text-primary hover:bg-primary flex cursor-pointer items-center justify-between rounded border p-1 shadow transition duration-100 hover:-translate-y-0.5 hover:text-white",
                isEditable && "bg-primary -translate-y-0.5 text-white",
              )}
            >
              <Edit2 className="h-4 w-4" />
            </button>
          </SheetHeader>

          <div className="mt-6 h-full">
            <Form {...form}>
              <div className="h-[calc(100vh-200px)]">
                <ScrollArea className="h-full">
                  <div className="space-y-4 px-6 pb-5">
                    <FormField
                      key="eqp"
                      control={form.control}
                      name="eqp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Equipamento</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Equipamento"
                              {...field}
                              disabled={!isEditable}
                              className={cn("", {
                                "border-destructive focus:border-destructive text-text-100 rounded-md":
                                  form.formState.errors.eqp,
                              })}
                              autoComplete="off"
                            />
                          </FormControl>
                          <FormMessage className="text-rose-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      key="tag"
                      control={form.control}
                      name="tag"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>TAG</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="TAG"
                              {...field}
                              disabled={!isEditable}
                              className={cn("", {
                                "border-destructive focus:border-destructive text-text-100 rounded-md":
                                  form.formState.errors.tag,
                              })}
                              autoComplete="off"
                            />
                          </FormControl>
                          <FormMessage className="text-rose-500" />
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
                            <Input
                              placeholder="Serviço"
                              {...field}
                              disabled={!isEditable}
                              className={cn("", {
                                "border-destructive focus:border-destructive text-text-100 rounded-md":
                                  form.formState.errors.service,
                              })}
                              autoComplete="off"
                            />
                          </FormControl>
                          <FormMessage className="text-rose-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      key="worker"
                      control={form.control}
                      name="worker"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Responsável</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Responsável"
                              {...field}
                              disabled={!isEditable}
                              className={cn("", {
                                "border-destructive focus:border-destructive text-text-100 rounded-md":
                                  form.formState.errors.worker,
                              })}
                              autoComplete="off"
                            />
                          </FormControl>
                          <FormMessage className="text-rose-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      key="consumption"
                      control={form.control}
                      name="consumption"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Consumo</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Consumo"
                              {...field}
                              disabled={!isEditable}
                              className={cn("", {
                                "border-destructive focus:border-destructive text-text-100 rounded-md":
                                  form.formState.errors.consumption,
                              })}
                              autoComplete="off"
                            />
                          </FormControl>
                          <FormMessage className="text-rose-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      key="date"
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Execução</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Data de Execução"
                              {...field}
                              disabled={!isEditable}
                              className={cn("", {
                                "border-destructive focus:border-destructive text-text-100 rounded-md":
                                  form.formState.errors.date,
                              })}
                              autoComplete="off"
                            />
                          </FormControl>
                          <FormMessage className="text-rose-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      key="status"
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Data de Execução"
                              {...field}
                              disabled={!isEditable}
                              className={cn("", {
                                "border-destructive focus:border-destructive text-text-100 rounded-md":
                                  form.formState.errors.status,
                              })}
                              autoComplete="off"
                            />
                          </FormControl>
                          <FormMessage className="text-rose-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      key="place"
                      control={form.control}
                      name="place"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Local</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Data de Execução"
                              {...field}
                              disabled={!isEditable}
                              className={cn("", {
                                "border-destructive focus:border-destructive text-text-100 rounded-md":
                                  form.formState.errors.place,
                              })}
                              autoComplete="off"
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
                  variant="outline"
                  onClick={HandleDeleteEquipment}
                  disabled={isDeleting || !selectedEquipment}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Excluindo...
                    </>
                  ) : (
                    "Excluir Equipamento"
                  )}
                </Button>
                <Button
                  onClick={HandleEditEquipment}
                  disabled={isEditing || !isEditable}
                  type="button"
                  className="flex-1"
                >
                  {isEditing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Editando...
                    </>
                  ) : (
                    "Editar Equipamento"
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
