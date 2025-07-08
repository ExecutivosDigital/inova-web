import { PlanningProps } from "./planning";

export interface ProgrammingProps {
  id: string;
  workers: {
    value: string;
    label: string;
  }[];
  selectedOss: PlanningProps[];
  startDate: Date;
  endDate: Date;
}
