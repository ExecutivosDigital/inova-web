import { menusConfig } from "@/config/menus";
import { cn } from "@/lib/utils";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenusProps {
  title: string;
  route: string;
  icon: {
    src: string;
    height: number;
    width: number;
    blurHeight: number;
    blurWidth: number;
  };
}

export default function MainMenu() {
  const menus = menusConfig.mainNav || [];
  const path = usePathname();

  return (
    <div>
      <NavigationMenu.Root className="group relative flex justify-start">
        <NavigationMenu.List className="group flex list-none gap-2">
          {menus?.map((item: MenusProps, index: number) => (
            <NavigationMenu.Item key={`item-${index}`}>
              <NavigationMenu.Trigger asChild className="flex items-center">
                <Link href={item.route}>
                  <div
                    className={cn(
                      "group data-[state=open]:text-primary-300 flex cursor-pointer items-center gap-2 px-6 py-2 2xl:py-4",
                      item.route === "/"
                        ? path === "/"
                          ? "border-primary-500 from-primary/5 via-primary/30 to-primary/5 text-default-900 border-t-primary border-t-2 bg-gradient-to-r from-0% to-100% font-semibold backdrop-blur backdrop-filter"
                          : "text-default-500"
                        : path.startsWith(item.route)
                          ? "border-primary-500 from-primary/5 via-primary/30 to-primary/5 text-default-900 border-t-primary border-t-2 bg-gradient-to-r from-0% to-100% font-semibold backdrop-blur backdrop-filter"
                          : "text-default-500",
                    )}
                  >
                    {item.route === "/" ? (
                      <Image
                        src={`/icons/dashboard.png`}
                        alt=""
                        width={20}
                        height={20}
                        className="h-4 w-4 2xl:h-5 2xl:w-5"
                      />
                    ) : (
                      <Image
                        src={`/icons/${item.route.split("/")[1]}.png`}
                        alt=""
                        width={20}
                        height={20}
                        className="h-4 w-4 2xl:h-5 2xl:w-5"
                      />
                    )}
                    {/* <item.icon className="h-5 w-5 " /> */}
                    <span className="text-sm text-white">{item.title}</span>
                  </div>
                </Link>
              </NavigationMenu.Trigger>
              {path !== item.route && (
                <NavigationMenu.Content
                  className={cn(
                    "border-primary bg-popover text-popover-foreground w-full rounded-md border-b shadow-lg",
                  )}
                />
              )}
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </div>
  );
}
