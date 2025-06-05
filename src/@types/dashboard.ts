export interface DashboardOsProps {
  id: number;
  worker: string;
  service: string;
  key: string;
  executed: string;
  spent: string;
  status: string;
}

export interface DashboardEquipmentProps {
  id: number;
  eqp: string;
  tag: string;
  service: string;
  worker: string;
  consumption: string;
  date: string;
  status: string;
  place: string;
  placeCode: string;
}
