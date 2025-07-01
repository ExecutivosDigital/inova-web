"use client";
import { Card } from "@/components/ui/card";
import { Step, Stepper } from "@/components/ui/steps";
import { CheckCheck } from "lucide-react";
export function MaterialHeader() {
  const steps: { label: string; icon: React.ReactNode }[] = [
    {
      label: "Cadastro Básico do Material",
      icon: "",
    },
    {
      label: "Especificações Técnicas",
      icon: "",
    },
    {
      label: "Dados de Estoque e Embalagem",
      icon: "",
    },
    {
      label: "Fornecedores e Contatos",
      icon: <CheckCheck className="h-max w-5 object-contain" />,
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <span className="text-primary text-xl font-bold">
        Cadastramento de Material
      </span>
      <span className="text-neutral-500">
        Importância de fazer o Cadastramento do Layout
      </span>
      <div className="flex flex-col gap-4">
        <Card>
          <span>Etapas do Cadastramento</span>
          <Stepper current={1} gap direction="horizontal">
            {steps?.map((label, index) => (
              <Step key={index} icon={label.icon} />
            ))}
          </Stepper>
        </Card>
      </div>
    </div>
  );
}
