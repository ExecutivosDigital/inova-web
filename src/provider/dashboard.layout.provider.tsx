"use client";
import React from "react";
// import Sidebar from "@/components/partials/sidebar";
import LayoutLoader from "@/components/layout-loader";
import Header from "@/components/partials/header";
import MobileSidebar from "@/components/partials/mobile-sidebar";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/utils/use-media-query";
import { useMounted } from "@/utils/use-mounted";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const DashBoardLayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const location = usePathname();
  const isMobile = useMediaQuery("(min-width: 768px)");
  const mounted = useMounted();
  if (!mounted) {
    return <LayoutLoader />;
  }

  return (
    <>
      <Header />

      <div className={cn("content-wrapper transition-all duration-150")}>
        <div className={cn("page-min-height-horizontal px-6 pt-6 pb-8", {})}>
          <LayoutWrapper isMobile={isMobile} location={location}>
            {children}
          </LayoutWrapper>
        </div>
      </div>
      {/* <Footer handleOpenSearch={() => setOpen(true)} /> */}
      {/* <ThemeCustomize /> */}
    </>
  );
};

export default DashBoardLayoutProvider;

const LayoutWrapper = ({
  children,
  location,
}: {
  children: React.ReactNode;
  isMobile: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: any;
}) => {
  return (
    <>
      <motion.div
        key={location}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0,
            y: 50,
          },
          pageAnimate: {
            opacity: 1,
            y: 0,
          },
          pageExit: {
            opacity: 0,
            y: -50,
          },
        }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.5,
        }}
      >
        <main>{children}</main>
      </motion.div>

      <MobileSidebar className="left-[300px]" />
      {/* <HeaderSearch open={open} setOpen={setOpen} /> */}
    </>
  );
};
