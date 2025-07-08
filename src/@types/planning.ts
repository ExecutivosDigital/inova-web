export interface PlanningProps {
  id: string;
  eqp: {
    id: string;
    name: string;
    service: {
      id: string;
      name: string;
      est: string;
    };
    materials: {
      id: string;
      name: string;
    }[];
    tools: {
      id: string;
      name: string;
    }[];
  };

  startDate: Date;
  endDate: Date;
  worker: { value: string; label: string }[];
  selected?: boolean;
}
