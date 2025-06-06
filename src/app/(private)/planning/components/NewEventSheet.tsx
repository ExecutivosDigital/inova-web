import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { setHours, setMinutes } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import CreatableSelect from "react-select/creatable";
import { z } from "zod";

interface NewEventDataProps {
  name: string;
  description?: string;
  attendees: string[];
}

const schema = z.object({
  title: z.string(),
  description: z.string().optional(),
  attendees: z.array(z.string()),
  startDate: z.date(),
  endDate: z.date(),
});

const NewEventSheet = ({
  open,
  onClose,
  selectedDate,
  presetName,
}: {
  open: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  selectedEventId: string | null;
  presetName?: string;
}) => {
  const [newEventData, setNewEventData] = useState<NewEventDataProps>({
    name: "",
    description: "",
    attendees: [],
  });
  const [selectedStart, setSelectedStart] = useState<Date | undefined>(
    selectedDate || new Date(),
  );
  const [timeValueStart, setTimeValueStart] = useState<string>(
    selectedDate
      ? selectedDate.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "12:00",
  );

  const [selectedEnd, setSelectedEnd] = useState<Date | undefined>(
    selectedDate
      ? new Date(selectedDate.getTime() + 60 * 60 * 1000)
      : new Date(new Date().getTime() + 60 * 60 * 1000),
  );
  const [timeValueEnd, setTimeValueEnd] = useState<string>(
    selectedDate
      ? new Date(selectedDate.getTime() + 60 * 60 * 1000).toLocaleTimeString(
          "pt-BR",
          {
            hour: "2-digit",
            minute: "2-digit",
          },
        )
      : "13:00",
  );
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [isCreating] = useState(false);
  const [isStartTimePopoverOpen, setIsStartTimePopoverOpen] = useState(false);
  const [isEndTimePopoverOpen, setIsEndTimePopoverOpen] = useState(false);

  const { control } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const handleTimeChangeStart: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selectedStart) {
      setTimeValueStart(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selectedStart, minutes), hours);
    setSelectedStart(newSelectedDate);
    setTimeValueStart(time);
  };

  const handleDaySelectStart = (date: Date | undefined) => {
    if (!timeValueStart || !date) {
      setSelectedStart(date);
      return;
    }
    const [hours, minutes] = timeValueStart
      .split(":")
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );
    setSelectedStart(newDate);
  };

  const handleTimeChangeEnd: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selectedEnd) {
      setTimeValueEnd(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selectedEnd, minutes), hours);
    setSelectedEnd(newSelectedDate);
    setTimeValueEnd(time);
  };

  const handleDaySelectEnd = (date: Date | undefined) => {
    if (!timeValueEnd || !date) {
      setSelectedEnd(date);
      return;
    }
    const [hours, minutes] = timeValueEnd
      .split(":")
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );
    setSelectedEnd(newDate);
  };

  useEffect(() => {
    if (presetName) {
      setNewEventData({
        ...newEventData,
        name: presetName,
      });
    }
  }, [presetName]);

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
              <SheetTitle>Criar Novo Evento</SheetTitle>
            </SheetHeader>
            <div className="mt-6 h-full">
              <form className="flex h-full flex-col">
                <div className="space-y-4 px-6 pb-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="title">
                      Nome do Evento <span className="font-bold">*</span>
                    </Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Digite o nome do evento"
                      value={newEventData?.name}
                      onChange={(e) =>
                        setNewEventData({
                          ...newEventData,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="description">Descrição do Evento</Label>
                    <Input
                      id="description"
                      type="text"
                      placeholder="Digite a descrição do evento"
                      value={newEventData?.description}
                      onChange={(e) =>
                        setNewEventData({
                          ...newEventData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="startDate" className="mb-1.5">
                      Data de início <span className="font-bold">*</span>
                    </Label>
                    <Popover
                      open={isStartTimePopoverOpen}
                      onOpenChange={setIsStartTimePopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "border-default-200 text-default-600 w-full justify-between text-left font-normal",
                            // !event.start && "text-muted-foreground",
                          )}
                        >
                          {selectedStart
                            ? new Date(selectedStart).toLocaleDateString(
                                "pt-BR",
                                {
                                  month: "numeric",
                                  day: "numeric",
                                },
                              )
                            : ""}
                          {""} - {timeValueStart}h
                          <CalendarIcon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        side="left"
                        className="z-[99999] w-auto p-0"
                      >
                        <Controller
                          name="startDate"
                          control={control}
                          render={({}) => (
                            <Calendar
                              mode="single"
                              selected={selectedStart}
                              onSelect={(e) => {
                                handleDaySelectStart(e);
                                setIsStartTimePopoverOpen(false);
                              }}
                            />
                          )}
                        />
                        <div className="bg-primary/10 flex w-full items-center justify-between p-2 font-semibold">
                          <span>Hora: </span>
                          <input
                            type="time"
                            value={timeValueStart}
                            onChange={handleTimeChangeStart}
                            step="60"
                            className="focus:border-primary focus:outline-primary focus:ring-primary bg-transparent focus:text-white"
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="endDate" className="mb-1.5">
                      Data de encerramento <span className="font-bold">*</span>
                    </Label>
                    <Popover
                      open={isEndTimePopoverOpen}
                      onOpenChange={setIsEndTimePopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-between border-black text-left font-normal text-black",
                            // !event.start && "text-muted-foreground",
                          )}
                        >
                          {selectedEnd
                            ? new Date(selectedEnd).toLocaleDateString(
                                "pt-BR",
                                {
                                  month: "numeric",
                                  day: "numeric",
                                },
                              )
                            : ""}
                          {""} - {timeValueEnd}h
                          <CalendarIcon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        side="left"
                        className="z-[99999] w-auto p-0"
                      >
                        <Controller
                          name="endDate"
                          control={control}
                          render={({}) => (
                            <Calendar
                              mode="single"
                              selected={selectedEnd}
                              onSelect={(e) => {
                                handleDaySelectEnd(e);
                                setIsEndTimePopoverOpen(false);
                              }}
                            />
                          )}
                        />
                        <div className="bg-primary/10 flex w-full items-center justify-between p-2 font-semibold">
                          <span>Hora: </span>
                          <input
                            type="time"
                            value={timeValueEnd}
                            onChange={handleTimeChangeEnd}
                            step="60"
                            className="focus:border-primary focus:outline-primary focus:ring-primary bg-transparent"
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="endDate" className="mb-1.5">
                      Convidados
                    </Label>
                    <CreatableSelect
                      components={{
                        DropdownIndicator: null,
                      }}
                      className="w-full"
                      isMulti
                      placeholder="email@email.com"
                      onChange={(e) =>
                        setNewEventData({
                          ...newEventData,
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          attendees: e.map((event: any) => event.value),
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="endDate" className="mb-1.5">
                      Plataforma <span className="font-bold">*</span>
                    </Label>
                    <div
                      className={cn(
                        "flex w-full items-center justify-between gap-2 rounded-lg p-1",
                        // isUpdating && "opacity-70",
                      )}
                    >
                      <button
                        onClick={() => setSelectedPlatform("google")}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-lg border px-2 py-0.5 font-semibold transition duration-200 disabled:cursor-wait",
                          selectedPlatform === "google" &&
                            "border-primary text-primary",
                        )}
                      >
                        <Icon icon="devicon:google" className="h-8 w-8" />
                        Google
                      </button>
                      <button
                        onClick={() => setSelectedPlatform("outlook")}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-lg border px-2 py-0.5 font-semibold transition duration-200 disabled:cursor-wait",
                          selectedPlatform === "outlook" &&
                            "border-primary text-primary",
                        )}
                      >
                        <Icon
                          icon="vscode-icons:file-type-outlook"
                          className="h-8 w-8"
                        />
                        Outlook
                      </button>
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={selectedPlatform === "" || isCreating}
                  className="mx-auto w-max text-white"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando...
                    </>
                  ) : (
                    "Criar Evento"
                  )}
                </Button>
              </form>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NewEventSheet;
