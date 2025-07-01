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

export const sortByPosition = (
  a: { position: string },
  b: { position: string },
) => {
  const aParts = a.position.split(".").map(Number);
  const bParts = b.position.split(".").map(Number);

  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    if ((aParts[i] || 0) !== (bParts[i] || 0)) {
      return (aParts[i] || 0) - (bParts[i] || 0);
    }
  }
  return 0;
};
