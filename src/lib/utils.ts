import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isLocationMatch = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  targetLocation: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locationName: any,
): boolean => {
  return (
    locationName === targetLocation ||
    locationName.startsWith(`${targetLocation}/`)
  );
};

export const formatDate = (date: string | number | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("pt-BR", options);
};
