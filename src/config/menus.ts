import {
  Activities,
  Budgets,
  Dashboard,
  Finance,
  Projects,
} from "@/components/svg";

export interface MenuItemProps {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick: () => void;
}

export const menusConfig = {
  mainNav: [
    {
      title: "Visão Geral",
      icon: Dashboard,
      route: "/",
    },
    {
      title: "Planejamento",
      icon: Activities,
      route: "/planning",
    },
    {
      title: "Programação",
      icon: Budgets,
      route: "/programming",
    },
    {
      title: "Equipamentos",
      icon: Projects,
      route: "/equipments",
    },
    {
      title: "Materiais",
      icon: Finance,
      route: "/materials",
    },
  ],
};
export type MainNavType = (typeof menusConfig.mainNav)[number];
