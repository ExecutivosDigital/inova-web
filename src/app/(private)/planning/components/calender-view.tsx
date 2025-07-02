"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/utils/use-media-query";
import { EventContentArg } from "@fullcalendar/core";
import ptBR from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import { Plus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ExternalDraggingevent from "./dragging-events";
import { NewRoutePlanSheet } from "./NewRoutePlanSheet";
import { RoutePlanSheet } from "./RoutePlanSheet";

interface CalendarEventProps {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  extendedProps: {
    calendar: string;
  };
}

const CalendarView = () => {
  const [selectedEventDate] = useState<Date | null>(new Date());
  const [openRoutePlanSheet, setOpenRoutePlanSheet] = useState<boolean>(false);
  const [openNewRoutePlanSheet, setOpenNewRoutePlanSheet] =
    useState<boolean>(false);
  const [newSelectedDate, setNewSelectedDate] = useState<Date | null>(null);
  const [sidebarDate, setSidebarDate] = React.useState<Date>(new Date());
  const [sidebarEvents] = React.useState<CalendarEventProps[] | null>([]);
  const isLg = useMediaQuery("(min-width: 1024px)");

  const handleCloseModal = () => {
    setOpenRoutePlanSheet(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateClick = (arg: any) => {
    setOpenNewRoutePlanSheet(true);
    setNewSelectedDate(arg.date);
  };

  const handleCloseDateClick = () => {
    setOpenNewRoutePlanSheet(false);
    setNewSelectedDate(null);
  };

  const handleClassName = () => {
    return "min-h-[40px] border-none transition duration-150 hover:-translate-y-0.5 hover:shadow-sm";
  };

  function RenderEventContent(eventInfo: EventContentArg) {
    return (
      <>
        <div
          className={cn(
            "text-primary relative flex h-full min-h-[40px] w-full gap-2 overflow-x-hidden rounded-md border p-2 font-semibold",
            eventInfo.event.extendedProps.calendar === "outlook"
              ? "bg-primary text-white"
              : "border-primary bg-white text-black",
            eventInfo.view.type === "dayGridMonth" && "truncate",
          )}
        >
          <Image
            src="/logo/icon.png"
            alt=""
            width={200}
            height={200}
            className={cn(
              "absolute",
              isLg
                ? "top-2 left-2 h-5 w-max object-contain"
                : "top-1 left-1 h-4 w-max object-contain",
            )}
          />

          <span className="ml-6 h-full w-full">{eventInfo.event.title}</span>
        </div>
      </>
    );
  }

  function renderNoEventsContent() {
    return (
      <span className="text-primary text-2xl font-bold">
        Sem OS planejadas neste período
      </span>
    );
  }

  const [dragEvents] = useState([
    { title: "Rota 1", id: "123465123612", tag: "business" },
    { title: "Rota 2", id: "64562346", tag: "business" },
    { title: "Rota 3", id: "374692348567", tag: "business" },
  ]);

  useEffect(() => {
    const draggableEl = document.getElementById("external-events");

    const initDraggable = () => {
      if (draggableEl) {
        new Draggable(draggableEl, {
          itemSelector: ".fc-event",
          eventData: function (eventEl) {
            const title = eventEl.getAttribute("title");
            const id = eventEl.getAttribute("data");
            const event = dragEvents.find((e) => e.id === id);
            const tag = event ? event.tag : "";
            // setPresetName(title ? title : "");
            return {
              title: title,
              id: id,
              extendedProps: {
                calendar: tag,
              },
            };
          },
        });
      }
    };

    if (dragEvents.length > 0) {
      initDraggable();
    }

    return () => {
      draggableEl?.removeEventListener("mousedown", initDraggable);
    };
  }, [dragEvents]);

  return (
    <>
      <div className="divide-border grid h-full grid-cols-12 gap-6 divide-x lg:gap-2 xl:gap-6">
        <Card className="col-span-12 h-[80vh] border-r-0 p-0 lg:col-span-4 lg:h-full 2xl:col-span-3">
          <CardContent className="h-full p-0">
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 border-none pt-5 lg:gap-1 lg:px-1 lg:pt-2 xl:pt-5">
              <Button
                onClick={() => handleDateClick({ date: new Date() })}
                className="m-0 w-full text-white lg:h-max lg:px-2 lg:py-1 lg:text-xs xl:h-9 xl:px-3 xl:py-2 xl:text-sm"
              >
                <Plus className="h-4 w-4 text-white ltr:mr-1 rtl:ml-1" />
                Novo Planejamento de Rota
              </Button>
            </CardHeader>
            <div className="px-3">
              <Calendar
                mode="single"
                selected={sidebarDate}
                onSelect={(e) => setSidebarDate(e as Date)}
                className="w-full rounded-md border border-none p-0"
              />
            </div>
            <div
              id="external-events"
              className="mt-6 space-y-1.5 px-4 lg:mt-2 xl:mt-6"
            >
              <p className="text-default-700 pb-2 text-sm font-medium">
                Arraste os cards para o calendário para planejar uma rota
              </p>
              {dragEvents.map((event) => (
                <ExternalDraggingevent key={event.id} event={event} />
              ))}
            </div>
            <ScrollArea className="h-80 py-2">
              {sidebarEvents && sidebarEvents.length !== 0 ? (
                sidebarEvents.map((item, index) => (
                  <div
                    // onClick={() => handleEventClick(item.id)}
                    className="before:bg-primary hover:bg-primary/10 relative flex cursor-pointer items-center justify-between gap-4 px-2 pl-4 transition duration-100 before:absolute before:top-0 before:left-0 before:h-full before:w-1 hover:-translate-y-0.5 hover:shadow"
                    key={`works-note-${index}`}
                  >
                    <div>
                      <div className="text-default-800 text-xs font-medium lg:text-sm xl:text-base 2xl:text-lg">
                        {item.title}
                      </div>
                      <div className="text-default-500 text-[10px] lg:text-sm">
                        {new Date(item.start).toLocaleTimeString("pt-BR", {
                          hour: "numeric",
                          minute: "numeric",
                        })}{" "}
                        -{" "}
                        {new Date(item.end).toLocaleTimeString("pt-BR", {
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </div>
                    </div>
                    <button
                      // onClick={() => setOpenModal(true)}
                      className="border-primary text-primary hover:bg-primary hover:text-primary h-8 rounded border bg-transparent px-4 text-xs font-semibold transition duration-100 lg:text-sm xl:text-base 2xl:text-lg"
                    >
                      <span>Abrir</span>
                    </button>
                  </div>
                ))
              ) : sidebarEvents && sidebarEvents.length === 0 ? (
                <div className="before:bg-primary relative flex items-center justify-between gap-4 px-2 pl-4 transition duration-100 before:absolute before:top-0 before:left-0 before:h-full before:w-1">
                  <div>
                    <div className="text-default-800 text-xs font-medium lg:text-sm xl:text-base 2xl:text-lg">
                      Nenhuma rota encontrada nesse dia.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mx-auto h-10 w-11/12 animate-pulse bg-zinc-200" />
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="col-span-12 h-[80vh] pt-5 lg:col-span-8 lg:h-full 2xl:col-span-9">
          <CardContent
            className={cn("dash-tail-calendar h-full", !isLg && "p-0")}
          >
            {isLg ? (
              <FullCalendar
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                // events={calendarEvents}
                // editable={true}
                rerenderDelay={10}
                nowIndicator={true}
                eventDurationEditable={false}
                selectable={true}
                selectMirror={true}
                // eventReceive={(info) => {
                //   setOpenNewRoutePlanSheet(true);
                //   setNewSelectedDate(info.event.start);
                //   info.revert();
                // }}
                // droppable={true}
                weekends={true}
                eventClassNames={handleClassName}
                eventContent={RenderEventContent}
                dateClick={() => setOpenRoutePlanSheet(true)}
                // eventClick={(arg) => handleEventClick(arg.event._def.publicId)}
                initialView="dayGridMonth"
                locale={ptBR}
                noEventsContent={renderNoEventsContent}
              />
            ) : (
              <>
                <FullCalendar
                  plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                  ]}
                  headerToolbar={{
                    start: "",
                    center: "prev,next",
                    end: "title",
                  }}
                  // events={calendarEvents}
                  // editable={true}
                  rerenderDelay={10}
                  nowIndicator={true}
                  eventDurationEditable={false}
                  selectable={true}
                  selectMirror={true}
                  // droppable={true}
                  weekends={true}
                  eventClassNames={handleClassName}
                  eventContent={RenderEventContent}
                  dateClick={handleDateClick}
                  // eventClick={(arg) =>
                  //   handleEventClick(arg.event._def.publicId)
                  // }
                  initialView="dayGridMonth"
                  locale={ptBR}
                  viewClassNames={"h-[70vh]"}
                  noEventsContent={renderNoEventsContent}
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {openRoutePlanSheet && (
        <RoutePlanSheet
          open={openRoutePlanSheet}
          onClose={handleCloseModal}
          selectedDate={selectedEventDate}
        />
      )}
      {newSelectedDate && (
        <NewRoutePlanSheet
          open={openNewRoutePlanSheet}
          onClose={handleCloseDateClick}
          selectedDate={newSelectedDate}
        />
      )}
    </>
  );
};

export default CalendarView;
