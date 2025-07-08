import { PlanningProps } from "@/@types/planning";
import moment from "moment";

export const planningList: PlanningProps[] = [
  {
    area: {
      id: "1",
      name: "Área 1",
    },
    id: "1",
    eqp: {
      id: "1",
      name: "Equipamento 1",
      service: {
        id: "1",
        name: "Serviço 1",
        est: "1h:30m",
      },
      materials: [
        {
          id: "1",
          name: "Material 1",
        },
      ],
      tools: [
        {
          id: "1",
          name: "Ferramenta 1",
        },
      ],
    },
    startDate: moment().add(1, "hour").startOf("hour").toDate(),
    endDate: moment().add(2, "hour").startOf("hour").toDate(),
    worker: [
      {
        value: "Gabriel",
        label: "Gabriel",
      },
    ],
    selected: false,
  },
  {
    area: {
      id: "2",
      name: "Área 2",
    },
    id: "2",
    eqp: {
      id: "2",
      name: "Equipamento 2",
      service: {
        id: "2",
        name: "Serviço 2",
        est: "2h:30m",
      },
      materials: [
        {
          id: "2",
          name: "Material 2",
        },
      ],
      tools: [
        {
          id: "2",
          name: "Ferramenta 2",
        },
      ],
    },
    startDate: moment().add(1, "hour").startOf("hour").toDate(),
    endDate: moment().add(2, "hour").startOf("hour").toDate(),
    worker: [
      {
        value: "João",
        label: "João",
      },
    ],
    selected: false,
  },
  {
    area: {
      id: "3",
      name: "Área 3",
    },
    id: "3",
    eqp: {
      id: "3",
      name: "Equipamento 3",
      service: {
        id: "3",
        name: "Serviço 3",
        est: "3h:30m",
      },
      materials: [
        {
          id: "3",
          name: "Material 3",
        },
      ],
      tools: [
        {
          id: "3",
          name: "Ferramenta 3",
        },
      ],
    },
    startDate: moment().add(1, "hour").startOf("hour").toDate(),
    endDate: moment().add(2, "hour").startOf("hour").toDate(),
    worker: [
      {
        value: "Maria",
        label: "Maria",
      },
    ],
    selected: false,
  },
  {
    area: {
      id: "4",
      name: "Área 4",
    },
    id: "4",
    eqp: {
      id: "4",
      name: "Equipamento 4",
      service: {
        id: "4",
        name: "Serviço 4",
        est: "4h:30m",
      },
      materials: [
        {
          id: "4",
          name: "Material 4",
        },
      ],
      tools: [
        {
          id: "4",
          name: "Ferramenta 4",
        },
      ],
    },
    startDate: moment().add(1, "hour").startOf("hour").toDate(),
    endDate: moment().add(2, "hour").startOf("hour").toDate(),
    worker: [
      {
        value: "Maycon",
        label: "Maycon",
      },
    ],
    selected: false,
  },
  {
    area: {
      id: "5",
      name: "Área 5",
    },
    id: "5",
    eqp: {
      id: "5",
      name: "Equipamento 5",
      service: {
        id: "5",
        name: "Serviço 5",
        est: "5h:30m",
      },
      materials: [
        {
          id: "5",
          name: "Material 5",
        },
      ],
      tools: [
        {
          id: "5",
          name: "Ferramenta 5",
        },
      ],
    },
    startDate: moment().add(1, "hour").startOf("hour").toDate(),
    endDate: moment().add(2, "hour").startOf("hour").toDate(),
    worker: [
      {
        value: "Victor",
        label: "Victor",
      },
    ],
    selected: false,
  },
  {
    area: {
      id: "6",
      name: "Área 6",
    },
    id: "6",
    eqp: {
      id: "6",
      name: "Equipamento 6",
      service: {
        id: "6",
        name: "Serviço 6",
        est: "6h:30m",
      },
      materials: [
        {
          id: "6",
          name: "Material 6",
        },
      ],
      tools: [
        {
          id: "6",
          name: "Ferramenta 6",
        },
      ],
    },
    startDate: moment().add(1, "hour").startOf("hour").toDate(),
    endDate: moment().add(2, "hour").startOf("hour").toDate(),
    worker: [
      {
        value: "Gabriel",
        label: "Gabriel",
      },
    ],
    selected: false,
  },
  {
    area: {
      id: "7",
      name: "Área 7",
    },
    id: "7",
    eqp: {
      id: "7",
      name: "Equipamento 7",
      service: {
        id: "7",
        name: "Serviço 7",
        est: "7h:30m",
      },
      materials: [
        {
          id: "7",
          name: "Material 7",
        },
      ],
      tools: [
        {
          id: "7",
          name: "Ferramenta 7",
        },
      ],
    },
    startDate: moment().add(1, "hour").startOf("hour").toDate(),
    endDate: moment().add(2, "hour").startOf("hour").toDate(),
    worker: [
      {
        value: "João",
        label: "João",
      },
    ],
    selected: false,
  },
  {
    area: {
      id: "8",
      name: "Área 8",
    },
    id: "8",
    eqp: {
      id: "8",
      name: "Equipamento 8",
      service: {
        id: "8",
        name: "Serviço 8",
        est: "8h:80m",
      },
      materials: [
        {
          id: "8",
          name: "Material 8",
        },
      ],
      tools: [
        {
          id: "8",
          name: "Ferramenta 8",
        },
      ],
    },
    startDate: moment().add(1, "hour").startOf("hour").toDate(),
    endDate: moment().add(2, "hour").startOf("hour").toDate(),
    worker: [
      {
        value: "Maria",
        label: "Maria",
      },
    ],
    selected: false,
  },
  {
    area: {
      id: "9",
      name: "Área 9",
    },
    id: "9",
    eqp: {
      id: "9",
      name: "Equipamento 9",
      service: {
        id: "9",
        name: "Serviço 9",
        est: "9h:30m",
      },
      materials: [
        {
          id: "9",
          name: "Material 9",
        },
      ],
      tools: [
        {
          id: "9",
          name: "Ferramenta 9",
        },
      ],
    },
    startDate: moment().add(1, "hour").startOf("hour").toDate(),
    endDate: moment().add(2, "hour").startOf("hour").toDate(),
    worker: [
      {
        value: "Maycon",
        label: "Maycon",
      },
    ],
    selected: false,
  },
  {
    area: {
      id: "10",
      name: "Área 10",
    },
    id: "10",
    eqp: {
      id: "10",
      name: "Equipamento 10",
      service: {
        id: "10",
        name: "Serviço 10",
        est: "10h:30m",
      },
      materials: [
        {
          id: "10",
          name: "Material 10",
        },
      ],
      tools: [
        {
          id: "10",
          name: "Ferramenta 10",
        },
      ],
    },
    startDate: moment().add(1, "hour").startOf("hour").toDate(),
    endDate: moment().add(2, "hour").startOf("hour").toDate(),
    worker: [
      {
        value: "Victor",
        label: "Victor",
      },
    ],
    selected: false,
  },
];
