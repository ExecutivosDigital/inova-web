import { DashboardOsProps } from "@/@types/dashboard";
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
  worker: z
    .string()
    .min(1, "Responsável é obrigatório")
    .min(2, "Responsável deve ter pelo menos 2 caracteres.")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Responsável deve conter apenas letras"),
  service: z
    .string()
    .min(1, "Serviço é obrigatório")
    .min(2, "Serviço deve ter pelo menos 2 caracteres."),
  os: z
    .string()
    .min(1, "OS é obrigatório")
    .min(2, "OS deve ter pelo menos 2 caracteres."),
  executed: z.string().optional().or(z.literal("")),
  spent: z.string().optional().or(z.literal("")),
});

interface OsSheetProps {
  open: boolean;
  onClose: () => void;
  selectedOs: DashboardOsProps;
}

export function OsSheet({ open, onClose, selectedOs }: OsSheetProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      worker: "",
      service: "",
      os: "",
      executed: "",
      spent: "",
    },
  });

  const useFormSteps = (form: UseFormReturn<z.infer<typeof FormSchema>>) => {
    const [activeStep, setActiveStep] = useState(0);

    const stepFields = {
      0: ["worker", "service", "os", "executed", "spent"] as const,
    };

    const validateStep = async (step: number) => {
      const fields = stepFields[step as keyof typeof stepFields];
      if (!fields) return true;
      return await form.trigger(fields);
    };

    return { activeStep, validateStep, setActiveStep };
  };

  const { validateStep } = useFormSteps(form);

  async function HandleEditOs() {
    const isValid = await validateStep(0);
    if (!isValid) {
      const errors = form.formState.errors;

      // Define field labels with proper typing
      const fieldLabels: Record<keyof z.infer<typeof FormSchema>, string> = {
        worker: "Responsável",
        service: "Serviço",
        os: "OS",
        executed: "Data Executada",
        spent: "Tempo de Conclusão",
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
    setIsEditing(false);
  }

  async function HandleDeleteOs() {
    if (!selectedOs) return;

    setIsDeleting(true);

    try {
      onClose();
    } catch (error) {
      console.error("Error deleting OS:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  useEffect(() => {
    if (selectedOs && open) {
      form.reset({
        worker: selectedOs.worker || "",
        service: selectedOs.service || "",
        os: selectedOs.os || "",
        executed: selectedOs.executed || "",
        spent: selectedOs.spent || "",
      });
    }
  }, [selectedOs, open, form]);

  useEffect(() => {
    if (!open) {
      form.reset({
        worker: "",
        service: "",
        os: "",
        executed: "",
        spent: "",
      });
    }
  }, [open, form]);

  return (
    <Sheet open={open}>
      <SheetContent
        onPointerDownOutside={onClose}
        onClose={onClose}
        className="h-screen px-0"
      >
        <SheetHeader className="flex-row items-center justify-between px-6">
          <SheetTitle>
            {selectedOs ? `OS: ${selectedOs.os}` : "Nova OS"}
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
                    key="os"
                    control={form.control}
                    name="os"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OS</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="OS"
                            {...field}
                            disabled={!isEditable}
                            className={cn("", {
                              "border-destructive focus:border-destructive text-text-100 rounded-md":
                                form.formState.errors.os,
                            })}
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage className="text-rose-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    key="executed"
                    control={form.control}
                    name="executed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data Executada</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Data Executada"
                            {...field}
                            disabled={!isEditable}
                            className={cn("", {
                              "border-destructive focus:border-destructive text-text-100 rounded-md":
                                form.formState.errors.executed,
                            })}
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage className="text-rose-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    key="spent"
                    control={form.control}
                    name="spent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tempo de Conclusão</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Tempo de Conclusão"
                            {...field}
                            disabled={!isEditable}
                            className={cn("", {
                              "border-destructive focus:border-destructive text-text-100 rounded-md":
                                form.formState.errors.spent,
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
                onClick={HandleDeleteOs}
                disabled={isDeleting || !selectedOs}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Excluindo...
                  </>
                ) : (
                  "Excluir Ordem de Serviço"
                )}
              </Button>
              <Button
                onClick={HandleEditOs}
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
                  "Editar Ordem de Serviço"
                )}
              </Button>
            </div>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
