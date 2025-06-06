import { cn } from "@/lib/utils";
const ExternalDraggingevent = ({
  event,
}: {
  event: { title: string; id: string; tag: string };
}) => {
  const { title, id, tag } = event;

  return (
    <div
      title={title}
      data-id={id}
      className={cn(
        "fc-event bg-default-100 flex cursor-move items-center gap-2 rounded px-4 py-1.5 text-sm shadow-sm",
        {
          "bg-primary/10": tag === "business",
          "bg-warning/10": tag === "meeting",
          "bg-destructive/10": tag === "holiday",
          "bg-info/10": tag === "etc",
        },
      )}
    >
      <span
        className={cn("block h-2 w-2 rounded-full", {
          "bg-primary": tag === "business",
          "bg-warning": tag === "meeting",
          "bg-destructive": tag === "holiday",
          "bg-info": tag === "etc",
        })}
      ></span>
      <span className="text-default-900 text-sm font-medium"> {title}</span>
    </div>
  );
};

export default ExternalDraggingevent;
