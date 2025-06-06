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
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { StylesConfig } from "react-select";
import Select from "react-select";
import { ProposalStatus, ProposalType } from "./EditClient";

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

const yesNoOptions: Option[] = [
  { value: "true", label: "Sim" },
  { value: "false", label: "Não" },
];

const CreateClient = ({
  open,
  onClose,
  handleRefresh,
}: {
  open: boolean;
  onClose: () => void;
  handleRefresh: () => void;
}) => {
  const { PostAPI, GetAPI, IBGEAPI } = useApiContext();

  // Text fields
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [churchName, setChurchName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [churchWidth, setChurchWidth] = useState("");
  const [churchHeight, setChurchHeight] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [allServicesValue, setAllServicesValue] = useState("");
  const [architectureValue, setArchitectureValue] = useState("");
  const [architectureAnd3dValue, setArchitectureAnd3dValue] = useState("");

  // Dropdown selections
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null);
  const [countryOptions, setCountryOptions] = useState<Option[]>([]);
  const [selectedState, setSelectedState] = useState<Option | null>(null);
  const [stateOptions, setStateOptions] = useState<Option[]>([]);
  const [selectedCity, setSelectedCity] = useState<Option | null>(null);
  const [cityOptions, setCityOptions] = useState<Option[]>([]);
  const [selectedRole, setSelectedRole] = useState<Option | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<Option | null>(null);
  const [selectedHaveOtherProposals, setSelectedHaveOtherProposals] =
    useState<Option | null>(null);

  // Proposal status / type from API
  const [proposalStatusList, setProposalStatusList] = useState<
    ProposalStatus[]
  >([]);
  const [proposalTypeList, setProposalTypeList] = useState<ProposalType[]>([]);
  const [selectedProposalStatus, setSelectedProposalStatus] =
    useState<Option | null>(null);
  const [selectedProposalType, setSelectedProposalType] =
    useState<Option | null>(null);

  // Goals / dynamic fields
  const [goal, setGoal] = useState<string | null>(null);

  // Conditional dropdowns for expected cost & investimento
  const [expectedCostOptions, setExpectedCostOptions] = useState<Option[]>([]);
  const [selectedExpectedCost, setSelectedExpectedCost] =
    useState<Option | null>(null);

  const [expectedInvestimentoOptions, setExpectedInvestimentoOptions] =
    useState<Option[]>([]);
  const [selectedExpectedInvestimento, setSelectedExpectedInvestimento] =
    useState<Option | null>(null);

  // Call date and time
  const [callDate, setCallDate] = useState("");
  const [callTime, setCallTime] = useState("");

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Fetch proposal status & types
  async function handleGetProposalStatus() {
    try {
      const response = await GetAPI("proposal-status/proposals", true);
      if (response.status === 200) {
        setProposalStatusList(response.body.status);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar fases de proposta.");
    }
  }
  async function handleGetProposalTypes() {
    try {
      const response = await GetAPI("proposal-type/proposals", true);
      if (response.status === 200) {
        setProposalTypeList(response.body.types);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar tipos de proposta.");
    }
  }
  useEffect(() => {
    if (proposalStatusList.length === 0) handleGetProposalStatus();
    if (proposalTypeList.length === 0) handleGetProposalTypes();
  }, []);

  // IBGE: fetch countries, states, cities
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

  // Watch for changes in "goal" to reconfigure dependent dropdowns
  useEffect(() => {
    const isFachada = goal === "Quero reformar somente fachada";
    // expected cost options
    if (isFachada) {
      setExpectedCostOptions([
        { value: "até 20 mil", label: "Até 20 mil" },
        { value: "até 50 mil", label: "Até 50 mil" },
        { value: "até 100 mil", label: "Até 100 mil" },
        { value: "100 mil +", label: "100 mil +" },
      ]);
    } else {
      setExpectedCostOptions([
        { value: "até 100 mil", label: "Até 100 mil" },
        { value: "até 300 mil", label: "Até 300 mil" },
        { value: "até 500 mil", label: "Até 500 mil" },
        {
          value: "entre 700 mil e 1 milhão",
          label: "Entre 700 mil e 1 milhão",
        },
        {
          value: "entre 1 milhão e 3 milhões",
          label: "Entre 1 milhão e 3 milhões",
        },
      ]);
    }
    setSelectedExpectedCost(null);

    // expected investimento options
    if (isFachada) {
      setExpectedInvestimentoOptions([
        { value: "3 e 5 mil reais", label: "3 e 5 mil reais" },
        { value: "entre 5 e 7 mil reais", label: "Entre 5 e 7 mil reais" },
        { value: "mais de 7 mil reais", label: "Mais de 7 mil reais" },
      ]);
    } else {
      setExpectedInvestimentoOptions([
        { value: "Entre 7 e 12 mil reais", label: "Entre 7 e 12 mil reais" },
        { value: "Entre 15 e 30 mil reais", label: "Entre 15 e 30 mil reais" },
        { value: "Entre 30 e 50 mil reais", label: "Entre 30 e 50 mil reais" },
      ]);
    }
    setSelectedExpectedInvestimento(null);

    // clear churchHeight if facade goal
    if (isFachada) {
      setChurchHeight("");
    }
  }, [goal]);

  function handleClear() {
    setName("");
    setLastName("");
    setChurchName("");
    setDescription("");
    setPhone("");
    setChurchWidth("");
    setChurchHeight("");
    setTargetValue("");
    setExpirationDate("");
    setAllServicesValue("");
    setArchitectureValue("");
    setArchitectureAnd3dValue("");
    setCallDate("");
    setCallTime("");
    setSelectedCountry(null);
    setSelectedState(null);
    setSelectedCity(null);
    setSelectedRole(null);
    setSelectedCapacity(null);
    setSelectedHaveOtherProposals(null);
    setSelectedProposalStatus(null);
    setSelectedProposalType(null);
    setGoal(null);
    setSelectedExpectedCost(null);
    setSelectedExpectedInvestimento(null);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (
      !name ||
      !lastName ||
      !selectedCountry ||
      !selectedRole ||
      !churchName ||
      !goal ||
      !description ||
      !phone ||
      !selectedProposalStatus ||
      !selectedProposalType
    ) {
      toast.error("Por favor, preencha todos os campos obrigatórios!");
      return;
    }
    // churchHeight is required unless goal = fachada
    if (goal !== "Quero reformar somente fachada" && !churchHeight) {
      toast.error("Por favor, insira a altura do templo.");
      return;
    }

    setIsLoading(true);
    const payload = {
      name,
      lastName,
      country: selectedCountry.label,
      state: selectedState?.label || "",
      city: selectedCity?.label || "",
      role: selectedRole.value,
      churchName,
      goal,
      description,
      phone,
      proposalStatusId: selectedProposalStatus.value,
      proposalTypeId: selectedProposalType.value,
      callDate: new Date(`${callDate}T${callTime}`).toISOString(),
      callTime,
      allServicesValue: Number(allServicesValue),
      architectureValue: Number(architectureValue),
      architectureAnd3dValue: Number(architectureAnd3dValue),
      expirationDate: new Date(expirationDate).toISOString(),
      // clientId,
      capacity: selectedCapacity?.value || "",
      targetValue,
      expectedProjectValue: selectedExpectedCost?.value || "",
      churchWidth,
      churchHeight:
        goal !== "Quero reformar somente fachada" ? churchHeight : undefined,
      haveOtherProposals: selectedHaveOtherProposals?.value === "true",
      expectedInvestimento: selectedExpectedInvestimento?.value,
    };

    try {
      const response = await PostAPI("/proposal", payload, true);
      console.log("response", response);
      console.log("payload", payload);
      setIsLoading(false);
      if (response.status === 200) {
        toast.success("Orçamento criado com sucesso!");
        handleRefresh();
        handleClear();
        onClose();
      } else {
        toast.error("Falha ao criar o orçamento. Tente novamente!");
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error("Erro ao conectar com o servidor.");
    }
  };

  const proposalStatusOptions: Option[] = proposalStatusList.map((item) => ({
    value: item.id,
    label: item.name,
    id: item.id,
  }));
  const proposalTypeOptions: Option[] = proposalTypeList.map((item) => ({
    value: item.id,
    label: item.description,
    id: item.id,
  }));

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="h-auto overflow-y-auto pt-5">
        <SheetHeader className="mb-4 flex-row items-center justify-between">
          <span className="text-default-900 text-lg font-semibold">
            Criar Orçamento
          </span>
        </SheetHeader>
        <form
          onSubmit={handleSubmit}
          className="flex h-full flex-col justify-between space-y-4"
        >
          {/* Dados Pessoais */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-default-600 mb-1.5">
                Nome *
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="João"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-default-600 mb-1.5">
                Sobrenome *
              </Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Silva"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-default-600 mb-1.5">
                Telefone *
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(maskPhone(e.target.value))}
                placeholder="+55 11 91234-5678"
                maxLength={15}
              />
            </div>
            <div>
              <Label htmlFor="role" className="text-default-600 mb-1.5">
                Cargo *
              </Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                options={roleOptions}
                value={selectedRole}
                styles={colorStyles}
                placeholder="Selecione um cargo"
                onChange={(opt) => setSelectedRole(opt)}
                isSearchable={false}
                noOptionsMessage={() => "Nenhuma opção encontrada"}
              />
            </div>
          </div>

          {/* Dados da Igreja e Projeto */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="churchName" className="text-default-600 mb-1.5">
                Nome da Igreja *
              </Label>
              <Input
                id="churchName"
                value={churchName}
                onChange={(e) => setChurchName(e.target.value)}
                placeholder="Igreja da Paz"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-default-600 mb-1.5">
                Descrição do Projeto *
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Queremos construir uma igreja com capacidade para 300 pessoas."
              />
            </div>
            <div>
              <Label htmlFor="goal" className="text-default-600 mb-1.5">
                Objetivo *
              </Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                options={proposalTypeOptions}
                value={selectedProposalType}
                styles={colorStyles}
                placeholder="Selecione o objetivo"
                onChange={(opt) => {
                  if (opt) {
                    setSelectedProposalType(opt);
                    setGoal(opt.label);
                  }
                }}
                noOptionsMessage={() => "Nenhuma opção encontrada"}
                isSearchable={false}
              />
            </div>
            {/* Largura do templo */}
            <div>
              <Label htmlFor="churchWidth" className="text-default-600 mb-1.5">
                Largura do Templo (m)
              </Label>
              <Input
                id="churchWidth"
                value={churchWidth}
                onChange={(e) => setChurchWidth(e.target.value)}
                placeholder="20m"
              />
            </div>
            {/* Altura do templo (condicional) */}
            {goal !== "Quero reformar somente fachada" && (
              <div>
                <Label
                  htmlFor="churchHeight"
                  className="text-default-600 mb-1.5"
                >
                  Altura do Templo (m)
                </Label>
                <Input
                  id="churchHeight"
                  value={churchHeight}
                  onChange={(e) => setChurchHeight(e.target.value)}
                  placeholder="30m"
                />
              </div>
            )}
            {/* Capacidade */}
            <div>
              <Label htmlFor="capacity" className="text-default-600 mb-1.5">
                Capacidade
              </Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                options={capacityOptions}
                value={selectedCapacity}
                styles={colorStyles}
                placeholder="Selecione a capacidade"
                onChange={(opt) => setSelectedCapacity(opt)}
                noOptionsMessage={() => "Nenhuma opção encontrada"}
                isSearchable={false}
              />
            </div>
            {/* Já fez orçamento com outros profissionais */}
            <div>
              <Label
                htmlFor="haveOtherProposals"
                className="text-default-600 mb-1.5"
              >
                Já fez orçamento com outros profissionais?
              </Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                options={yesNoOptions}
                value={selectedHaveOtherProposals}
                styles={colorStyles}
                placeholder="Selecione uma opção"
                onChange={(opt) => setSelectedHaveOtherProposals(opt)}
                noOptionsMessage={() => "Nenhuma opção encontrada"}
                isSearchable={false}
              />
            </div>
          </div>

          {/* Localização */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="country" className="text-default-600 mb-1.5">
                País *
              </Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                options={countryOptions}
                value={selectedCountry}
                styles={colorStyles}
                placeholder="Selecione um país"
                onChange={(opt) => setSelectedCountry(opt)}
                isSearchable
                noOptionsMessage={() => "Nenhum país encontrado"}
              />
            </div>
            {selectedCountry?.label === "Brasil" && (
              <>
                <div>
                  <Label htmlFor="state" className="text-default-600 mb-1.5">
                    Estado *
                  </Label>
                  <Select
                    className="react-select"
                    classNamePrefix="select"
                    options={stateOptions}
                    value={selectedState}
                    styles={colorStyles}
                    placeholder="Selecione um estado"
                    onChange={(opt) => setSelectedState(opt)}
                    isSearchable
                    noOptionsMessage={() => "Nenhum estado encontrado"}
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="text-default-600 mb-1.5">
                    Cidade *
                  </Label>
                  <Select
                    className="react-select"
                    classNamePrefix="select"
                    options={cityOptions}
                    value={selectedCity}
                    styles={colorStyles}
                    placeholder="Selecione uma cidade"
                    onChange={(opt) => setSelectedCity(opt)}
                    isSearchable
                    noOptionsMessage={() => "Nenhuma cidade encontrada"}
                  />
                </div>
              </>
            )}
          </div>

          {/* Valores e Prazos */}
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="allServicesValue"
                className="text-default-600 mb-1.5"
              >
                Valor Todos Serviços (R$)
              </Label>
              <Input
                id="allServicesValue"
                type="number"
                value={allServicesValue}
                onChange={(e) => setAllServicesValue(e.target.value)}
                placeholder="10000"
              />
            </div>
            <div>
              <Label
                htmlFor="architectureValue"
                className="text-default-600 mb-1.5"
              >
                Valor Arquitetura (R$)
              </Label>
              <Input
                id="architectureValue"
                type="number"
                value={architectureValue}
                onChange={(e) => setArchitectureValue(e.target.value)}
                placeholder="4000"
              />
            </div>
            <div>
              <Label
                htmlFor="architectureAnd3dValue"
                className="text-default-600 mb-1.5"
              >
                Valor Arquitetura + 3D (R$)
              </Label>
              <Input
                id="architectureAnd3dValue"
                type="number"
                value={architectureAnd3dValue}
                onChange={(e) => setArchitectureAnd3dValue(e.target.value)}
                placeholder="6000"
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
                id="expirationDate"
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            </div>
            {/* Target Value */}
            <div>
              <Label htmlFor="targetValue" className="text-default-600 mb-1.5">
                Valor Alvo (R$)
              </Label>
              <Input
                id="targetValue"
                type="text"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                placeholder="100000"
              />
            </div>
            {/* Expected Cost (dropdown dinâmico) */}
            <div>
              <Label htmlFor="expectedCost" className="text-default-600 mb-1.5">
                Custo Esperado
              </Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                options={expectedCostOptions}
                value={selectedExpectedCost}
                styles={colorStyles}
                placeholder="Selecione o custo esperado"
                onChange={(opt) => setSelectedExpectedCost(opt)}
                noOptionsMessage={() => "Nenhuma opção encontrada"}
                isSearchable={false}
              />
            </div>
            {/* Expected Investimento (dropdown dinâmico) */}
            <div>
              <Label
                htmlFor="expectedInvestimento"
                className="text-default-600 mb-1.5"
              >
                Investimento Esperado
              </Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                options={expectedInvestimentoOptions}
                value={selectedExpectedInvestimento}
                styles={colorStyles}
                placeholder="Selecione o investimento esperado"
                onChange={(opt) => setSelectedExpectedInvestimento(opt)}
                noOptionsMessage={() => "Nenhuma opção encontrada"}
                isSearchable={false}
              />
            </div>
          </div>

          {/* Identificação e Status */}
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="proposalStatus"
                className="text-default-600 mb-1.5"
              >
                Fase da Proposta *
              </Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                options={proposalStatusOptions}
                value={selectedProposalStatus}
                styles={colorStyles}
                placeholder="Selecione a fase"
                onChange={(opt) => setSelectedProposalStatus(opt)}
                noOptionsMessage={() => "Nenhuma opção encontrada"}
                isSearchable={false}
              />
            </div>
            {/* <div>
              <Label htmlFor="proposalType" className="mb-1.5 text-default-600">
                Tipo de Proposta *
              </Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                options={proposalTypeOptions}
                value={selectedProposalType}
                styles={colorStyles}
                placeholder="Selecione o tipo"
                onChange={(opt) => {
                  if (opt) {
                    setSelectedProposalType(opt);
                    setGoal(opt.label);
                  }
                }}
                noOptionsMessage={() => "Nenhuma opção encontrada"}
                isSearchable={false}
              />
            </div> */}
          </div>

          {/* Agendamento de Ligação */}
          <div className="space-y-2">
            <Label className="text-default-600">
              PARA FINALIZAR, ESCOLHA O MELHOR HORÁRIO PARA VOCÊ RECEBER UMA
              LIGAÇÃO MINHA COM O SEU ORÇAMENTO *
            </Label>
            <div className="space-y-4">
              <div>
                <Label htmlFor="callDate" className="text-default-600 mb-1.5">
                  Data da Ligação
                </Label>
                <Input
                  id="callDate"
                  type="date"
                  value={callDate}
                  onChange={(e) => setCallDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="callTime" className="text-default-600 mb-1.5">
                  Horário da Ligação
                </Label>
                <Input
                  id="callTime"
                  type="time"
                  value={callTime}
                  onChange={(e) => setCallTime(e.target.value)}
                />
              </div>
            </div>
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
                "Criar Orçamento"
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateClient;
