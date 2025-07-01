"use client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
const LayoutLoader = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-2">
      <Image
        src="/logo/logo.png"
        alt=""
        width={100}
        height={100}
        className="h-10 w-max object-contain"
      />
      <span className="inline-flex gap-1">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Carregando...
      </span>
    </div>
  );
};

export default LayoutLoader;
