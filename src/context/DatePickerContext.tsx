"use client";

import moment from "moment";
import { createContext, useContext, useState } from "react";

interface DatePickerProps {
  startDate: Date;
  endDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DatePicker = createContext<DatePickerProps | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
}

export const DatePickerProvider = ({ children }: ProviderProps) => {
  const [startDate, setStartDate] = useState(
    moment().subtract(1, "week").toDate(),
  );
  const [endDate, setEndDate] = useState(moment().toDate());

  return (
    <DatePicker.Provider
      value={{
        startDate,
        endDate,
        setStartDate,
        setEndDate,
      }}
    >
      {children}
    </DatePicker.Provider>
  );
};

export function useDatePicker() {
  const context = useContext(DatePicker);
  if (!context) {
    throw new Error(
      "useDatePicker deve ser usado dentro de um DatePickerProvider",
    );
  }
  return context;
}
