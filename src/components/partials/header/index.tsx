"use client";
import { cn } from "@/lib/utils";
import { useSidebar, useThemeStore } from "@/store";
import React from "react";
import HorizontalMenu from "./horizontal-menu";

import { useMediaQuery } from "@/utils/use-media-query";
import { LogOut } from "lucide-react";
import { HorizontalHeader } from "./horizontal-header";
import ClassicHeader from "./layout/classic-header";
import MobileMenuHandler from "./mobile-menu-handler";
import { ProfileInfo } from "./profile-info";

const NavTools = ({
  isDesktop,
  sidebarType,
}: {
  isDesktop: boolean;
  isMobile: boolean;
  sidebarType: string;
}) => {
  return (
    <div className="nav-tools flex items-center gap-2">
      <div className="flex items-center gap-2 ltr:pl-2 rtl:pr-2">
        <ProfileInfo />
        <LogOut
          className="text-primary cursor-pointer"
          onClick={() => {
            if (confirm("Tem certeza que deseja sair?")) {
              // signOut();
            }
          }}
        />
      </div>
      {!isDesktop && sidebarType !== "module" && <MobileMenuHandler />}
    </div>
  );
};

const Header = () => {
  const { setSidebarType } = useSidebar();
  const { layout, navbarType } = useThemeStore();

  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isMobile = useMediaQuery("(min-width: 768px)");

  // set header style to classic if isDesktop
  React.useEffect(() => {
    if (!isDesktop && layout === "horizontal") {
      setSidebarType("classic");
    }
  }, [isDesktop]);

  return (
    <ClassicHeader
      className={cn(" ", {
        "sticky top-0 z-[1000]": navbarType === "sticky",
      })}
    >
      <div className="w-full border-b border-b-white bg-white px-[15px] py-0 backdrop-blur-lg md:px-6 2xl:py-3">
        <div className="flex h-full items-center justify-between">
          <HorizontalHeader />
          <NavTools
            isDesktop={isDesktop}
            isMobile={isMobile}
            sidebarType="horizontal"
          />
        </div>
      </div>
      {isDesktop && (
        <div className="bg-primary/60 w-full px-6 shadow-md backdrop-blur-lg">
          <HorizontalMenu />
        </div>
      )}
    </ClassicHeader>
  );
};

export default Header;
