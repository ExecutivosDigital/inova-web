"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store";
import { Menu } from "lucide-react";
const MobileMenuHandler = () => {
  const { mobileMenu, setMobileMenu } = useSidebar();
  return (
    <div>
      <Button
        onClick={() => setMobileMenu(!mobileMenu)}
        variant="ghost"
        size="icon"
        className="text-default-500 hover:bg-primary-100 hover:text-primary dark:text-default-800 dark:hover:bg-default-300 relative h-9 w-9 rounded-full"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MobileMenuHandler;
