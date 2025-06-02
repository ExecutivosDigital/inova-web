"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { menusConfig } from "@/config/menus";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
const MobileSidebar = ({ className }: { className?: string }) => {
  const { sidebarBg, mobileMenu, setMobileMenu } = useSidebar();
  const menus = menusConfig.mainNav || [];
  const { collapsed } = useSidebar();
  const path = usePathname();

  return (
    <>
      <div
        className={cn(
          "fixed top-0 z-[9999] h-full w-[248px] bg-white",
          className,
          {
            "invisible -left-[300px] opacity-0": !mobileMenu,
            "visible left-0 opacity-100": mobileMenu,
          },
        )}
      >
        {sidebarBg !== "none" && (
          <div
            className="absolute top-0 left-0 z-[-1] h-full w-full bg-cover bg-center opacity-[0.07]"
            style={{ backgroundImage: `url(${sidebarBg})` }}
          ></div>
        )}
        <Image
          src="/logo/logo.png"
          alt=""
          width={500}
          height={100}
          className="h-max w-full object-contain"
        />
        <ScrollArea
          className={cn("sidebar-menu h-[calc(100%-80px)]", {
            "px-4": !collapsed,
          })}
        >
          {// eslint-disable-next-line @typescript-eslint/no-explicit-any
          menus?.map((item: any, index: number) => (
            <div key={`item-${index}`}>
              <div className="flex items-center">
                <div
                  className={twMerge([
                    "group data-[state=open]:text-primary-300 flex w-full cursor-pointer items-center gap-2 px-6 py-4",
                    path === item.route
                      ? "border-primary-500 from-primary/5 via-primary/30 to-primary/5 text-default-900 border-b-2 bg-gradient-to-r from-0% to-100% backdrop-blur backdrop-filter"
                      : "text-default-500",
                  ])}
                >
                  {item.route === "/" ? (
                    <Image
                      src={`/icons/dashboard.png`}
                      alt=""
                      width={20}
                      height={20}
                    />
                  ) : (
                    <Image
                      src={`/icons/${item.route.split("/")[1]}.png`}
                      alt=""
                      width={20}
                      height={20}
                    />
                  )}
                  <Link href={item.route}>
                    <span className="text-sm font-medium">{item.title}</span>
                  </Link>
                </div>
              </div>
              {path !== item.route && (
                <div
                  className={cn(
                    "border-primary-300 bg-popover text-popover-foreground w-full rounded-md border shadow-lg",
                  )}
                />
              )}
            </div>
          ))}
        </ScrollArea>
      </div>
      {mobileMenu && (
        <div
          onClick={() => setMobileMenu(false)}
          className="overlay fixed inset-0 z-[999] bg-black/60 opacity-100 backdrop-blur-sm backdrop-filter"
        ></div>
      )}
    </>
  );
};

export default MobileSidebar;
