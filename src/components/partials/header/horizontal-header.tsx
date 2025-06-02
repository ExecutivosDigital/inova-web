import Image from "next/image";
import Link from "next/link";

export function HorizontalHeader() {
  return (
    <div className="flex items-center">
      <Link href="#" className="text-primary flex items-center">
        <Image
          src="/logo/logo.png"
          alt="logo"
          width={200}
          height={200}
          className="h-16 w-auto"
        />
      </Link>
    </div>
  );
}
