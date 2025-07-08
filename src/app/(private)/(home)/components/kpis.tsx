import { cn } from "@/lib/utils";

export function Kpis() {
  const tabsTrigger = [
    {
      value: "total",
      text: "OS Totais",
      total: "11",
      color: "primary",
    },
    {
      value: "open",
      text: "OS Em Aberto",
      total: "2",
      color: "warning",
    },
    {
      value: "done",
      text: "OS Concluídas",
      total: "5",
      color: "success",
    },
    {
      value: "behind",
      text: "OS Fin. com Atraso",
      total: "4",
      color: "info",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-4 p-2 shadow-sm xl:flex-row xl:px-0 xl:pb-4">
      {tabsTrigger.map((item) => (
        <div
          key={item.value}
          className={cn(
            "before:bg-primary/50 dark:before:bg-primary-foreground relative flex w-full flex-col items-start gap-1.5 overflow-hidden rounded-md p-4 before:absolute before:bottom-1 before:left-1/2 before:hidden before:h-[2px] before:w-9 before:-translate-x-1/2 data-[state=active]:shadow-none data-[state=active]:before:block data-[state=inactive]:opacity-50 xl:w-1/4",
            {
              "bg-primary/30 data-[state=active]:bg-primary/30 dark:bg-primary/20":
                item.color === "primary",
              "bg-amber-50 data-[state=active]:bg-amber-50 dark:bg-amber-100":
                item.color === "warning",
              "bg-green-50 data-[state=active]:bg-green-50 dark:bg-green-100":
                item.color === "success",
              "bg-red-50 data-[state=active]:bg-red-50 dark:bg-red-100":
                item.color === "info",
            },
          )}
        >
          <span
            className={cn(
              "bg-primary/40 ring-primary/30 absolute -top-3 -right-3 h-10 w-10 rounded-full ring-8",
              {
                "bg-primary/50 ring-primary/20 dark:bg-primary dark:ring-primary/40":
                  item.color === "primary",
                "bg-amber-200 ring-amber-100 dark:bg-amber-300 dark:ring-amber-400":
                  item.color === "warning",
                "bg-green-200 ring-green-100 dark:bg-green-300 dark:ring-green-400":
                  item.color === "success",
                "bg-red-200 ring-red-100 dark:bg-red-300 dark:ring-red-400":
                  item.color === "info",
              },
            )}
          ></span>
          <span className="text-primary relative z-10 h-5 text-sm font-semibold capitalize">
            <span className="transition-all duration-700">{item.text}</span>
          </span>
          <span className="text-primary relative h-7 text-lg font-semibold">
            <span className="transition-all duration-700">{item.total}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
