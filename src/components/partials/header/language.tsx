"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store";
import { Check } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import flag1 from "/public/images/all-img/flag-1.png";
import flag2 from "/public/images/all-img/flag-2.png";
import flag3 from "/public/images/all-img/flag-3.png";
const languages = [
  {
    name: "en",
    flag: flag1,
  },
  {
    name: "bn",
    flag: flag2,
  },
  {
    name: "ar",
    flag: flag3,
  },
];
const Language = () => {
  type Language = {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    flag: any;
    language?: string;
  };

  const router = useRouter();
  const pathname = usePathname();
  const { setRtl } = useThemeStore();
  const found = pathname
    ? languages.find((lang) => pathname.includes(lang.name))
    : null;
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    found ?? languages[0],
  );

  const handleSelected = (lang: string) => {
    setSelectedLanguage({
      ...selectedLanguage,
      name: lang,
      language: lang === "en" ? "En" : "Bn",
    });
    setRtl(lang === "ar");
    if (pathname) {
      router.push(`/${lang}/${pathname.split("/")[2]}`);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" className="bg-transparent hover:bg-transparent">
          <span className="me-1.5 h-6 w-6 rounded-full">
            <Image
              src={selectedLanguage ? selectedLanguage.flag : flag1}
              alt=""
              className="h-full w-full rounded-full object-cover"
            />
          </span>
          <span className="text-default-600 text-sm capitalize">
            {selectedLanguage ? selectedLanguage.name : "En"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2">
        {languages.map((item, index) => (
          <DropdownMenuItem
            key={`flag-${index}`}
            className={cn(
              "dark:hover:bg-background mb-[2px] cursor-pointer px-2 py-1.5 last:mb-0",
              {
                "bg-primary-100":
                  selectedLanguage && selectedLanguage.name === item.name,
              },
            )}
            onClick={() => handleSelected(item.name)}
          >
            <span className="me-1.5 h-6 w-6 rounded-full">
              <Image
                src={item.flag}
                alt=""
                className="h-full w-full rounded-full object-cover"
              />
            </span>
            <span className="text-default-600 text-sm capitalize">
              {item.name}
            </span>
            {selectedLanguage && selectedLanguage.name === item.name && (
              <Check className="text-default-700 h-4 w-4 flex-none ltr:ml-auto rtl:mr-auto" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Language;
