import { cn } from "@/lib/utils";
import { ScrollArea } from "./scroll-area";

interface ModalProps {
  className?: string;
  children?: React.ReactNode;
  isOpen: boolean;
  close: () => void;
}

export function Modal({ className, children, isOpen, close }: ModalProps) {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-[1000] flex h-full min-h-screen w-full items-center justify-center",
        !isOpen && "hidden",
      )}
    >
      <button
        onClick={close}
        className="absolute z-[1000] h-full w-full bg-white/30 backdrop-blur-sm"
      />
      <div
        className={cn(
          "border-primary z-[1000] h-[90vh] w-[90%] max-w-[700px] rounded-xl border bg-white p-2 shadow-md xl:p-4",
          className,
        )}
      >
        <ScrollArea className="h-full w-full">{children}</ScrollArea>
      </div>
    </div>
  );
}
