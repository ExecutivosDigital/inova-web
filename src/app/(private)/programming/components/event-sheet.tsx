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
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Edit2, Loader2 } from "lucide-react";
import { z } from "zod";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Icon } from "@iconify/react";
import { setHours, setMinutes } from "date-fns";
import CreatableSelect from "react-select/creatable";

interface EventDataProps {
  title: string;
  description?: string;
  attendees?: string[];
  start: Date;
  end: Date;
  id: string;
  extendedProps: {
    calendar: string;
  };
  scheduleLink: string;
  meet?: string;
}

interface EditedEventDataProps {
  name: string;
  description: string;
  attendees: string[];
}

const schema = z.object({
  title: z.string().min(3, { message: "Required" }),
  description: z.string().min(3, { message: "Required" }),
  attendees: z.array(z.string()).min(1, { message: "Required" }),
  startDate: z.date(),
  endDate: z.date(),
});

const EventSheet = ({
  open,
  onClose,
  selectedDate,
}: {
  open: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  selectedEventId: string | null;
}) => {
  const [event] = useState<EventDataProps | undefined>();
  const [editedEventData, setEditedEventData] = useState<EditedEventDataProps>({
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
  const [editable, setEditable] = useState(false);
  const [isEditing] = useState(false);
  const [isStartTimePopoverOpen, setIsStartTimePopoverOpen] = useState(false);
  const [isEndTimePopoverOpen, setIsEndTimePopoverOpen] = useState(false);
  const [isDeleting] = useState(false);
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    if (event) {
      setEditedEventData({
        name: event?.title,
        description: event?.description || "",
        attendees: event?.attendees
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            event?.attendees.map((attendee: any) => attendee?.email)
          : [],
      });
      setSelectedStart(event?.start);
      setSelectedEnd(event?.end);
      setTimeValueStart(
        new Date(event?.start).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
      setTimeValueEnd(
        new Date(event?.end).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }
  }, [event]);

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

  return (
    <>
      {event && (
        <>
          <Sheet open={open}>
            <SheetContent
              onPointerDownOutside={onClose}
              onClose={onClose}
              className="h-screen px-0"
            >
              <SheetHeader className="flex-row items-center justify-between px-6">
                <SheetTitle>{event?.title}</SheetTitle>
                <button
                  onClick={() => setEditable(!editable)}
                  className={cn(
                    "border-default-500 text-primary hover:bg-primary flex items-center justify-between rounded border p-1 shadow transition duration-100 hover:-translate-y-0.5 hover:text-white",
                    editable && "bg-primary -translate-y-0.5 text-white",
                  )}
                >
                  <Edit2 className="h-4 w-4" />
                </button>
              </SheetHeader>
              <div className="mt-6 h-full">
                <form className="h-full" onSubmit={handleSubmit(console.log)}>
                  <div className="h-[calc(100vh-200px)]">
                    <ScrollArea className="h-full">
                      <div className="space-y-4 px-6 pb-5">
                        <div className="space-y-1.5">
                          <Label htmlFor="title">
                            Nome do Evento <span className="font-bold">*</span>
                          </Label>
                          <Input
                            disabled={!editable}
                            id="title"
                            type="text"
                            placeholder="Digite o nome do evento"
                            value={editedEventData?.name}
                            onChange={(e) =>
                              setEditedEventData({
                                ...editedEventData,
                                name: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="description">
                            Descrição do Evento
                          </Label>
                          <Input
                            disabled={!editable}
                            id="description"
                            type="text"
                            placeholder="Digite a descrição do evento"
                            value={editedEventData?.description}
                            onChange={(e) =>
                              setEditedEventData({
                                ...editedEventData,
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
                            onOpenChange={() =>
                              setIsStartTimePopoverOpen(!isStartTimePopoverOpen)
                            }
                          >
                            <PopoverTrigger asChild>
                              <Button
                                disabled={!editable}
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
                            <PopoverContent className="z-[99999] w-auto p-0">
                              <Controller
                                name="startDate"
                                control={control}
                                render={() => (
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
                                  className="focus:border-primary focus:outline-primary focus:ring-primary bg-transparent"
                                />
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div>
                          <Label htmlFor="endDate" className="mb-1.5">
                            Data de encerramento{" "}
                            <span className="font-bold">*</span>
                          </Label>
                          <Popover
                            open={isEndTimePopoverOpen}
                            onOpenChange={() =>
                              setIsEndTimePopoverOpen(!isEndTimePopoverOpen)
                            }
                          >
                            <PopoverTrigger asChild>
                              <Button
                                disabled={!editable}
                                variant="outline"
                                className={cn(
                                  "border-default-200 text-default-600 w-full justify-between text-left font-normal",
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
                            <PopoverContent className="z-[99999] w-auto p-0">
                              <Controller
                                name="endDate"
                                control={control}
                                render={() => (
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
                            isDisabled={!editable}
                            className="w-full"
                            isMulti
                            placeholder="email@email.com"
                            value={editedEventData.attendees?.map(
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              (event: any) => ({
                                value: event,
                                label: event,
                              }),
                            )}
                            onChange={(e) =>
                              setEditedEventData({
                                ...editedEventData,
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
                              disabled
                              className={cn(
                                "flex w-full items-center gap-2 rounded-lg border px-2 py-0.5 font-semibold transition duration-200 disabled:cursor-not-allowed",
                                event?.extendedProps.calendar === "google" &&
                                  "border-primary text-primary",
                              )}
                            >
                              <Icon icon="devicon:google" className="h-8 w-8" />
                              Google
                            </button>
                            <button
                              disabled
                              className={cn(
                                "flex w-full items-center gap-2 rounded-lg border px-2 py-0.5 font-semibold transition duration-200 disabled:cursor-not-allowed",
                                event?.extendedProps.calendar === "outlook" &&
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
                    </ScrollArea>
                  </div>
                  <div className="flex flex-wrap gap-2 px-6 pb-12">
                    {editable ? (
                      <>
                        <Button variant="outline">
                          {isDeleting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                            </>
                          ) : (
                            "Excluir evento"
                          )}
                        </Button>
                        <Button
                          disabled={isEditing}
                          type="submit"
                          className="flex-1"
                        >
                          {isEditing ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Editando...
                            </>
                          ) : (
                            "Editar evento"
                          )}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => window.open(event.meet, "_blank")}
                          disabled={!event.meet}
                          className="flex-1"
                        >
                          Ir para o Meet
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() =>
                            window.open(event.scheduleLink, "_blank")
                          }
                          className="flex-1"
                        >
                          Ir para o Evento
                        </Button>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </>
  );
};

export default EventSheet;
