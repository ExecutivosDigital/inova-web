import { CookiesProvider } from "next-client-cookies/server";
import { ApiContextProvider } from "./ApiContext";
import { DatePickerProvider } from "./DatePickerContext";
import { EquipmentContextProvider } from "./EquipmentContext";
import { LayoutContextProvider } from "./LayoutContext";
import { MaterialContextProvider } from "./MaterialContext";
import { SampleContextProvider } from "./SampleContext";
import { ServiceContextProvider } from "./ServiceContext";

export function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CookiesProvider>
        <ApiContextProvider>
          <LayoutContextProvider>
            <ServiceContextProvider>
              <EquipmentContextProvider>
                <MaterialContextProvider>
                  <SampleContextProvider>
                    <DatePickerProvider>
                      {/* Any other Context Providers */}
                      {children}
                      {/* Any other Context Providers */}
                    </DatePickerProvider>
                  </SampleContextProvider>
                </MaterialContextProvider>
              </EquipmentContextProvider>
            </ServiceContextProvider>
          </LayoutContextProvider>
        </ApiContextProvider>
      </CookiesProvider>
    </>
  );
}
