import { EquipmentSetsProps, EquipmentsProps } from "@/@types/equipments";

export const equipments: EquipmentsProps[] = [
  {
    id: 1,
    name: "Motor 3.6 GTE",
    tag: "123456-A",
    consumption: "12 Litros",
    last: "01/05/2025 14:30",
    programmed: "08/05/2025 14:30",
    executed: "08/05/2025 15:30",
  },
];

export const equipmentSets: EquipmentSetsProps = {
  sets: [
    {
      id: 1,
      name: "Conjunto 1",
      subsets: [
        {
          id: 1,
          name: "Subconjunto 1",
          cips: [],
        },
      ],
    },
    {
      id: 2,
      name: "Conjunto 2",
      subsets: [],
    },
    {
      id: 3,
      name: "Conjunto 3",
      subsets: [],
    },
    {
      id: 4,
      name: "Conjunto 4",
      subsets: [],
    },
    {
      id: 5,
      name: "Conjunto 5",
      subsets: [],
    },
  ],
};
