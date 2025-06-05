export interface EquipmentsProps {
  id: number;
  name: string;
  tag: string;
  consumption: string;
  last: string;
  programmed: string;
  executed: string;
}

export interface EquipmentCipsProps {
  id: number;
  name: string;
}

export interface EquipmentSubsetsProps {
  id: number;
  name: string;
  cips: EquipmentCipsProps[];
}

export interface EquipmentSetProps {
  id: number;
  name: string;
  subsets: EquipmentSubsetsProps[];
}

export interface EquipmentSetsProps {
  sets: EquipmentSetProps[];
}
