"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "@/components/ui/sheet";
import { useApiContext } from "@/context/ApiContext";
import { maskPhone } from "@/utils/masks";
import { Edit, Loader2, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { StylesConfig } from "react-select";
import Select from "react-select";
import { Proposal } from "./DndKitGuide";

export type ProposalType = {
  name: string;
  id: string;
  color: string;
  description: string;
};
export type ProposalStatus = {
  color: string;
  id: string;
  name: string;
  position: number;
};

type Option = {
  value: string;
  label: string;
  id?: string;
};

const colorStyles: StylesConfig<Option, false> = {
  option: (provided, { isSelected }) => ({
    ...provided,
    color: "#000",
    backgroundColor: isSelected ? "#e2e8f0" : "#fff",
  }),
  control: (provided) => ({
    ...provided,
    borderColor: "#cbd5e0",
    "&:hover": { borderColor: "#a0aec0" },
  }),
};

const roleOptions: Option[] = [
  { value: "Pastor", label: "Pastor" },
  { value: "Pastora", label: "Pastora" },
  { value: "Cooperador", label: "Cooperador" },
  { value: "Cooperadora", label: "Cooperadora" },
  { value: "Outro(a)", label: "Outro(a)" },
];

const capacityOptions: Option[] = [
  { value: "entre 100 e 200 pessoas", label: "Entre 100 e 200 pessoas" },
  { value: "até 400 pessoas", label: "Até 400 pessoas" },
  { value: "entre 500 e 900 pessoas", label: "Entre 500 e 900 pessoas" },
  { value: "entre 1000 e 2000 pessoas", label: "Entre 1000 e 2000 pessoas" },
  { value: "entre 3000 e 5000 pessoas", label: "Entre 3000 e 5000 pessoas" },
];

const EditClient = ({
  open,
  onClose,
  handleRefresh,
  data,
}: {
  open: boolean;
  onClose: () => void;
  handleRefresh: () => void;
  data?: Proposal | null;
}) => {
  const { PutAPI, DeleteAPI, GetAPI, IBGEAPI } = useApiContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Main budget data
  const [budgetData, setBudgetData] = useState<Proposal>({
    allServicesValue: null,
    architectureAnd3dValue: null,
    architectureValue: null,
    callDate: "",
    callTime: "",
    capacity: "",
    churchHeight: "",
    churchName: "",
    churchWidth: "",
    city: "",
    client: null,
    country: "",
    createdAt: "",
    description: "",
    expectedProjectValue: "",
    expirationDate: null,
    goal: "",
    haveOtherProposals: false,
    id: "",
    lastName: "",
    name: "",
    phone: "",
    proposalStatus: {
      color: "",
      id: "",
      name: "",
      position: 0,
    },
    proposalLink: "",
    proposalType: {
      color: "",
      description: "",
      id: "",
      name: "",
    },
    role: "",
    state: "",
    targetValue: "",
    updatedAt: "",
  });

  // Dropdown option lists
  const [proposalTypes, setProposalTypes] = useState<ProposalType[]>([]);
  const [proposalStatusList, setProposalStatusList] = useState<
    ProposalStatus[]
  >([]);

  const [countryOptions, setCountryOptions] = useState<Option[]>([]);
  const [stateOptions, setStateOptions] = useState<Option[]>([]);
  const [cityOptions, setCityOptions] = useState<Option[]>([]);

  // Selected Option states (mirror budgetData fields)
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null);
  const [selectedState, setSelectedState] = useState<Option | null>(null);
  const [selectedCity, setSelectedCity] = useState<Option | null>(null);
  const [selectedRole, setSelectedRole] = useState<Option | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<Option | null>(null);
  const [selectedHaveOtherProposals, setSelectedHaveOtherProposals] =
    useState<Option | null>(null);
  const [selectedProposalType, setSelectedProposalType] =
    useState<Option | null>(null);
  const [selectedProposalStatus, setSelectedProposalStatus] =
    useState<Option | null>(null);

  // Load incoming data into state
  useEffect(() => {
    if (data) {
      setBudgetData(data);

      // Initialize select fields based on data
      if (data.country) {
        setSelectedCountry({ value: data.country, label: data.country });
      }
      if (data.state) {
        setSelectedState({ value: data.state, label: data.state });
      }
      if (data.city) {
        setSelectedCity({ value: data.city, label: data.city });
      }
      if (data.role) {
        setSelectedRole({ value: data.role, label: data.role });
      }
      if (data.capacity) {
        setSelectedCapacity({ value: data.capacity, label: data.capacity });
      }
      setSelectedHaveOtherProposals({
        value: data.haveOtherProposals ? "true" : "false",
        label: data.haveOtherProposals ? "Sim" : "Não",
      });
      if (data.proposalType) {
        setSelectedProposalType({
          value: data.proposalType.id,
          label: data.proposalType.name,
          id: data.proposalType.id,
        });
      }
      if (data.proposalStatus) {
        setSelectedProposalStatus({
          value: data.proposalStatus.id,
          label: data.proposalStatus.name,
          id: data.proposalStatus.id,
        });
      }
    }
  }, [data]);

  // Fetch proposal types and statuses
  async function handleGetProposalTypes() {
    try {
      const response = await GetAPI("proposal-type/proposals", true);
      if (response.status === 200) {
        setProposalTypes(response.body.types);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar tipos de proposta.");
    }
  }
  async function handleGetProposalStatus() {
    try {
      const response = await GetAPI("proposal-status/proposals", true);
      if (response.status === 200) {
        setProposalStatusList(response.body.status);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar status de proposta.");
    }
  }
  useEffect(() => {
    if (proposalTypes.length === 0) handleGetProposalTypes();
    if (proposalStatusList.length === 0) handleGetProposalStatus();
  }, []);

  // Fetch IBGE countries, states, cities
  const [isCountryLoaded, setIsCountryLoaded] = useState(false);
  useEffect(() => {
    if (isCountryLoaded) return;
    const fetchCountries = async () => {
      const response = await IBGEAPI("/paises");
      if (response.status === 200) {
        const opts = response.body.map((item: { nome: string }) => ({
          value: item.nome,
          label: item.nome,
        }));
        setCountryOptions(opts);
        setIsCountryLoaded(true);
      }
    };
    fetchCountries();
  }, [isCountryLoaded]);

  useEffect(() => {
    if (!selectedCountry) return;
    if (selectedCountry.label !== "Brasil") {
      setStateOptions([]);
      setSelectedState(null);
      setCityOptions([]);
      setSelectedCity(null);
      return;
    }
    const fetchEstados = async () => {
      const response = await IBGEAPI("estados");
      if (response.status === 200) {
        const opts = response.body.map(
          (estado: { id: string; nome: string }) => ({
            value: estado.id,
            label: estado.nome,
            id: estado.id,
          }),
        );
        setStateOptions(opts);
      }
    };
    fetchEstados();
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedState) return;
    const fetchCidades = async () => {
      const response = await IBGEAPI(`estados/${selectedState.id}/municipios`);
      if (response.status === 200) {
        const opts = response.body.map((cidade: { nome: string }) => ({
          value: cidade.nome,
          label: cidade.nome,
        }));
        setCityOptions(opts);
      }
    };
    fetchCidades();
  }, [selectedState]);

  // Sync budgetData fields when selects change
  useEffect(() => {
    setBudgetData((prev) => ({
      ...prev,
      country: selectedCountry?.label || "",
    }));
  }, [selectedCountry]);
  useEffect(() => {
    setBudgetData((prev) => ({ ...prev, state: selectedState?.label || "" }));
  }, [selectedState]);
  useEffect(() => {
    setBudgetData((prev) => ({ ...prev, city: selectedCity?.label || "" }));
  }, [selectedCity]);
  useEffect(() => {
    setBudgetData((prev) => ({ ...prev, role: selectedRole?.value || "" }));
  }, [selectedRole]);
  useEffect(() => {
    setBudgetData((prev) => ({
      ...prev,
      capacity: selectedCapacity?.value || "",
    }));
  }, [selectedCapacity]);
  useEffect(() => {
    setBudgetData((prev) => ({
      ...prev,
      haveOtherProposals: selectedHaveOtherProposals?.value === "true",
    }));
  }, [selectedHaveOtherProposals]);
  useEffect(() => {
    setBudgetData((prev) => ({
      ...prev,
      proposalType: selectedProposalType
        ? {
            id: selectedProposalType.value,
            name: selectedProposalType.label,
            color: "",
            description: "",
          }
        : { id: "", name: "", color: "", description: "" },
    }));
  }, [selectedProposalType]);
  useEffect(() => {
    setBudgetData((prev) => ({
      ...prev,
      proposalStatus: selectedProposalStatus
        ? {
            id: selectedProposalStatus.value,
            name: selectedProposalStatus.label,
            color: "",
            position: 0,
          }
        : { id: "", name: "", color: "", position: 0 },
    }));
  }, [selectedProposalStatus]);

  // Handle form submission (no required validation)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await PutAPI(
        `/proposal/${budgetData.id}`,
        budgetData,
        true,
      );
      setIsLoading(false);
      if (response.status === 200) {
        toast.success("Orçamento editado com sucesso!");
        handleRefresh();
        onClose();
      } else {
        toast.error("Falha ao editar o orçamento. Tente novamente!");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Erro ao conectar com o servidor.");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await DeleteAPI(`/proposal/${budgetData.id}`, true);
      setIsDeleting(false);
      if (response.status === 200) {
        toast.success("Orçamento excluído com sucesso!");
        handleRefresh();
        onClose();
      } else {
        toast.error("Falha ao excluir o orçamento. Tente novamente!");
      }
    } catch (error) {
      setIsDeleting(false);
      toast.error("Erro ao conectar com o servidor.");
      console.error(error);
    }
  };

  const proposalTypeOptions: Option[] = proposalTypes.map((type) => ({
    value: type.id,
    label: type.name,
    id: type.id,
  }));
  const proposalStatusOptions: Option[] = proposalStatusList.map((status) => ({
    value: status.id,
    label: status.name,
    id: status.id,
  }));

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="h-auto overflow-y-auto pt-5">
        <SheetHeader className="mb-4 flex-row items-center justify-between">
          <span className="text-default-900 text-lg font-semibold">
            Editar Orçamento
          </span>
          <div className="flex gap-2">
            <Button
              size="icon"
              onClick={() => setIsEditable(!isEditable)}
              variant={isEditable ? "soft" : "outline"}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              onClick={() => {
                if (
                  window.confirm("Tem certeza que deseja excluir o orçamento?")
                ) {
                  handleDelete();
                }
              }}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash className="h-4 w-4" />
              )}
            </Button>
          </div>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className="flex h-full flex-col justify-between space-y-4"
        >
          {/* Dados Pessoais */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-default-600 mb-1.5">
                Nome
              </Label>
              <Input
                disabled={!isEditable}
                id="name"
                value={budgetData.name}
                onChange={(e) =>
                  setBudgetData({ ...budgetData, name: e.target.value })
                }
                placeholder="Nome do proponente"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-default-600 mb-1.5">
                Sobrenome
              </Label>
              <Input
                disabled={!isEditable}
                id="lastName"
                value={budgetData.lastName}
                onChange={(e) =>
                  setBudgetData({ ...budgetData, lastName: e.target.value })
                }
                placeholder="Sobrenome do proponente"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-default-600 mb-1.5">
                Telefone
              </Label>
              <Input
                disabled={!isEditable}
                id="phone"
                value={budgetData.phone}
                onChange={(e) =>
                  setBudgetData({
                    ...budgetData,
                    phone: maskPhone(e.target.value),
                  })
                }
                placeholder="Telefone de contato"
                maxLength={15}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="role" className="text-default-600 mb-1.5">
              Cargo
            </Label>
            <Select
              className="react-select"
              classNamePrefix="select"
              options={roleOptions}
              value={selectedRole}
              styles={colorStyles}
              placeholder="Selecione o cargo"
              onChange={(opt) => setSelectedRole(opt)}
              isSearchable={false}
              noOptionsMessage={() => "Nenhuma opção encontrada"}
            />
          </div>
          {/* Proposta e Status */}
          <div className="space-y-4">
            {/* <div>
              <Label htmlFor="proposalType" className="mb-1.5 text-default-600">
                Tipo de Proposta
              </Label>
              <Select
                isDisabled={!isEditable}
                className="react-select"
                classNamePrefix="select"
                options={proposalTypeOptions}
                value={selectedProposalType}
                styles={colorStyles}
                placeholder="Selecione o tipo de proposta"
                onChange={(opt) => setSelectedProposalType(opt)}
                isSearchable={false}
                noOptionsMessage={() => "Nenhuma opção encontrada"}
              />
            </div> */}
            <div>
              <Label
                htmlFor="proposalStatus"
                className="text-default-600 mb-1.5"
              >
                Status da Proposta
              </Label>
              <Select
                isDisabled={!isEditable}
                className="react-select"
                classNamePrefix="select"
                options={proposalStatusOptions}
                value={selectedProposalStatus}
                styles={colorStyles}
                placeholder="Selecione o status da proposta"
                onChange={(opt) => setSelectedProposalStatus(opt)}
                isSearchable={false}
                noOptionsMessage={() => "Nenhuma opção encontrada"}
              />
            </div>
            <div>
              <Label htmlFor="goal" className="text-default-600 mb-1.5">
                Objetivo
              </Label>
              <Select
                isDisabled={!isEditable}
                className="react-select"
                classNamePrefix="select"
                options={proposalTypeOptions}
                value={selectedProposalType}
                styles={colorStyles}
                placeholder="Objetivo da proposta"
                onChange={(opt) => {
                  setSelectedProposalType(opt);
                  setBudgetData((prev) => ({
                    ...prev,
                    goal: opt?.label || "",
                  }));
                }}
                isSearchable={false}
                noOptionsMessage={() => "Nenhuma opção encontrada"}
              />
            </div>
            <div>
              <Label htmlFor="proposalLink" className="text-default-600 mb-1.5">
                Link da Proposta
              </Label>
              <Input
                disabled={!isEditable}
                id="proposalLink"
                value={budgetData.proposalLink}
                onChange={(e) =>
                  setBudgetData({ ...budgetData, proposalLink: e.target.value })
                }
                placeholder="Link da Proposta"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-default-600 mb-1.5">
                Descrição
              </Label>
              <Input
                disabled={!isEditable}
                id="description"
                value={budgetData.description}
                onChange={(e) =>
                  setBudgetData({ ...budgetData, description: e.target.value })
                }
                placeholder="Descrição da proposta"
              />
            </div>
            <div>
              <Label
                htmlFor="expectedProjectValue"
                className="text-default-600 mb-1.5"
              >
                Valor Esperado do Projeto
              </Label>
              <Input
                disabled={!isEditable}
                id="expectedProjectValue"
                value={budgetData.expectedProjectValue}
                onChange={(e) =>
                  setBudgetData({
                    ...budgetData,
                    expectedProjectValue: e.target.value,
                  })
                }
                placeholder="Valor esperado do projeto"
              />
            </div>
          </div>

          {/* Igreja e Dimensões */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="churchName" className="text-default-600 mb-1.5">
                Nome da Igreja
              </Label>
              <Input
                disabled={!isEditable}
                id="churchName"
                value={budgetData.churchName}
                onChange={(e) =>
                  setBudgetData({ ...budgetData, churchName: e.target.value })
                }
                placeholder="Nome da igreja"
              />
            </div>
            <div>
              <Label htmlFor="churchWidth" className="text-default-600 mb-1.5">
                Largura da Igreja (m)
              </Label>
              <Input
                disabled={!isEditable}
                id="churchWidth"
                value={budgetData.churchWidth}
                onChange={(e) =>
                  setBudgetData({ ...budgetData, churchWidth: e.target.value })
                }
                placeholder="Largura da igreja"
              />
            </div>
            <div>
              <Label htmlFor="churchHeight" className="text-default-600 mb-1.5">
                Altura da Igreja (m)
              </Label>
              <Input
                disabled={!isEditable}
                id="churchHeight"
                value={budgetData.churchHeight}
                onChange={(e) =>
                  setBudgetData({ ...budgetData, churchHeight: e.target.value })
                }
                placeholder="Altura da igreja"
              />
            </div>
            <div>
              <Label htmlFor="capacity" className="text-default-600 mb-1.5">
                Capacidade
              </Label>
              <Select
                isDisabled={!isEditable}
                className="react-select"
                classNamePrefix="select"
                options={capacityOptions}
                value={selectedCapacity}
                styles={colorStyles}
                placeholder="Capacidade estimada do projeto"
                onChange={(opt) => setSelectedCapacity(opt)}
                isSearchable={false}
                noOptionsMessage={() => "Nenhuma opção encontrada"}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                disabled={!isEditable}
                id="haveOtherProposals"
                type="checkbox"
                checked={budgetData.haveOtherProposals}
                onChange={(e) =>
                  setBudgetData({
                    ...budgetData,
                    haveOtherProposals: e.target.checked,
                  })
                }
              />
              <Label htmlFor="haveOtherProposals">
                Possui outras propostas?
              </Label>
            </div>
          </div>

          {/* Localização */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="country" className="text-default-600 mb-1.5">
                País
              </Label>
              <Select
                isDisabled={!isEditable}
                className="react-select"
                classNamePrefix="select"
                options={countryOptions}
                value={selectedCountry}
                styles={colorStyles}
                placeholder="País do proponente"
                onChange={(opt) => setSelectedCountry(opt)}
                isSearchable
                noOptionsMessage={() => "Nenhum país encontrado"}
              />
            </div>
            {selectedCountry?.label === "Brasil" && (
              <>
                <div>
                  <Label htmlFor="state" className="text-default-600 mb-1.5">
                    Estado
                  </Label>
                  <Select
                    isDisabled={!isEditable}
                    className="react-select"
                    classNamePrefix="select"
                    options={stateOptions}
                    value={selectedState}
                    styles={colorStyles}
                    placeholder="Estado do proponente"
                    onChange={(opt) => setSelectedState(opt)}
                    isSearchable
                    noOptionsMessage={() => "Nenhum estado encontrado"}
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="text-default-600 mb-1.5">
                    Cidade
                  </Label>
                  <Select
                    isDisabled={!isEditable}
                    className="react-select"
                    classNamePrefix="select"
                    options={cityOptions}
                    value={selectedCity}
                    styles={colorStyles}
                    placeholder="Cidade do proponente"
                    onChange={(opt) => setSelectedCity(opt)}
                    isSearchable
                    noOptionsMessage={() => "Nenhuma cidade encontrada"}
                  />
                </div>
              </>
            )}
          </div>

          {/* Datas e Valores */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="callDate" className="text-default-600 mb-1.5">
                Data da Ligação
              </Label>
              <Input
                disabled={!isEditable}
                type="date"
                id="callDate"
                value={budgetData.callDate?.slice(0, 10) || ""}
                onChange={(e) =>
                  setBudgetData({ ...budgetData, callDate: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="callTime" className="text-default-600 mb-1.5">
                Hora da Ligação
              </Label>
              <Input
                disabled={!isEditable}
                type="time"
                id="callTime"
                value={budgetData.callTime}
                onChange={(e) =>
                  setBudgetData({ ...budgetData, callTime: e.target.value })
                }
              />
            </div>
            <div>
              <Label
                htmlFor="expirationDate"
                className="text-default-600 mb-1.5"
              >
                Data de Expiração
              </Label>
              <Input
                disabled={!isEditable}
                id="expirationDate"
                type="date"
                value={
                  budgetData.expirationDate
                    ? budgetData.expirationDate.slice(0, 10)
                    : ""
                }
                onChange={(e) =>
                  setBudgetData({
                    ...budgetData,
                    expirationDate: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="targetValue" className="text-default-600 mb-1.5">
                Valor Alvo (R$)
              </Label>
              <Input
                disabled={!isEditable}
                id="targetValue"
                value={budgetData.targetValue}
                onChange={(e) =>
                  setBudgetData({ ...budgetData, targetValue: e.target.value })
                }
                placeholder="Valor alvo do projeto"
              />
            </div>
            {budgetData.expectedProjectValue !== undefined && (
              <div>
                <Label
                  htmlFor="expectedProjectValue"
                  className="text-default-600 mb-1.5"
                >
                  Valor Esperado do Projeto
                </Label>
                <Input
                  disabled={!isEditable}
                  id="expectedProjectValue"
                  value={budgetData.expectedProjectValue}
                  onChange={(e) =>
                    setBudgetData({
                      ...budgetData,
                      expectedProjectValue: e.target.value,
                    })
                  }
                  placeholder="Valor esperado do projeto"
                />
              </div>
            )}
            {budgetData.architectureValue !== null && (
              <div>
                <Label
                  htmlFor="architectureValue"
                  className="text-default-600 mb-1.5"
                >
                  Valor Arquitetura (R$)
                </Label>
                <Input
                  disabled={!isEditable}
                  id="architectureValue"
                  value={budgetData.architectureValue || ""}
                  onChange={(e) =>
                    setBudgetData({
                      ...budgetData,
                      architectureValue: e.target.value,
                    })
                  }
                  placeholder="Valor apenas da arquitetura"
                />
              </div>
            )}
            {budgetData.architectureAnd3dValue !== null && (
              <div>
                <Label
                  htmlFor="architectureAnd3dValue"
                  className="text-default-600 mb-1.5"
                >
                  Valor Arquitetura + 3D (R$)
                </Label>
                <Input
                  disabled={!isEditable}
                  id="architectureAnd3dValue"
                  value={budgetData.architectureAnd3dValue || ""}
                  onChange={(e) =>
                    setBudgetData({
                      ...budgetData,
                      architectureAnd3dValue: e.target.value,
                    })
                  }
                  placeholder="Valor de arquitetura com 3D"
                />
              </div>
            )}
            {budgetData.allServicesValue !== null && (
              <div>
                <Label
                  htmlFor="allServicesValue"
                  className="text-default-600 mb-1.5"
                >
                  Valor Todos os Serviços (R$)
                </Label>
                <Input
                  disabled={!isEditable}
                  id="allServicesValue"
                  value={budgetData.allServicesValue || ""}
                  onChange={(e) =>
                    setBudgetData({
                      ...budgetData,
                      allServicesValue: e.target.value,
                    })
                  }
                  placeholder="Valor total de todos os serviços"
                />
              </div>
            )}
          </div>

          {/* Rodapé com Botões */}
          <SheetFooter className="mt-4 gap-2 pb-10">
            <SheetClose asChild>
              <Button type="button" color="primary" variant="outline">
                Cancelar
              </Button>
            </SheetClose>
            <Button type="submit" className="w-32">
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Editar Orçamento"
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditClient;
