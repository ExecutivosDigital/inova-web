import { CookiesProvider } from "next-client-cookies/server";
import { ApiContextProvider } from "./ApiContext";
import { DatePickerProvider } from "./DatePickerContext";
import { SampleContextProvider } from "./SampleContext";

export function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CookiesProvider>
        <ApiContextProvider>
          <SampleContextProvider>
            <DatePickerProvider>
              {/* Any other Context Providers */}
              {children}
              {/* Any other Context Providers */}
            </DatePickerProvider>
          </SampleContextProvider>
        </ApiContextProvider>
      </CookiesProvider>
    </>
  );
}
