export interface MaterialProps {
  id: number;
  name: string;
  code: string;
  type: string;
  maker: string;
  volume: string;
  amount: string;
  packaging: string;
  minimum: string;
  status: string;
}

export interface MaterialOsProps {
  id: number;
  eqp: string;
  service: string;
  worker: string;
  consumption: string;
  date: string;
  status: string;
  place: string;
  placeCode: string;
}

export interface MaterialTypeProps {
  name: string;
  id: string;
  position: string;
  productId?: string;
  createdAt?: string;
}
