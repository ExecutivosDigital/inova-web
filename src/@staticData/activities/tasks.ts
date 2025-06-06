import { activitiesBoards } from "./boards";
import avatar1 from "/public/avatar/avatar-1.jpg";
import avatar2 from "/public/avatar/avatar-2.jpg";
import avatar3 from "/public/avatar/avatar-3.jpg";
import avatar4 from "/public/avatar/avatar-4.jpg";

export const activitiesTasks = [
  {
    boardId: activitiesBoards[1].id,
    id: "2e09c2fc-9d92-4df1-a3cc-bd8c8c51d85c",
    title: "Apresentação de Proposta",
    name: "Pastor Marcelo",
    phone: "(99) 99999-9999",
    desc: "Fazer apresentação para o cliente discutir o orçamento e prazo de execução.",
    status: "inprogress",
    tags: ["BAIXA", "REUNIÃO"],
    priority: "high",
    assign: [
      {
        name: "João",
        image: avatar1,
      },
      {
        name: "Maria",
        image: avatar2,
      },
      {
        name: "Gabriel",
        image: avatar3,
      },
      {
        name: "Victor",
        image: avatar4,
      },
    ],
    image: "",
    category: "ui & ux",
    pages: "0/7",
    messageCount: "05",
    link: "02",
    date: "02/04/2025",
    time: "11:00",
    list: [
      {
        id: "item-1",
        title: "Collect Data",
      },
      {
        id: "item-2",
        title: "Collect Icons",
      },
      {
        id: "item-1",
        title: "Make Project Layout",
      },
    ],
  },
  {
    boardId: activitiesBoards[2].id,
    id: "2e09c2fc-9d92-4df1-a3cc-bd8c8c51d85c",
    title: "Modelagem 3D",
    name: "Pastor Alexandre",
    phone: "(99) 99999-9999",
    desc: "Criar modelo 3D para apresentação ao conselho da paróquia.",
    status: "inprogress",
    tags: ["ALTA", "PROJETO"],
    priority: "high",
    assign: [
      {
        name: "João",
        image: avatar1,
      },
    ],
    image: "",
    category: "ui & ux",
    pages: "0/7",
    messageCount: "05",
    link: "02",
    date: "02/04/2025",
    time: "17:30",
    list: [
      {
        id: "item-1",
        title: "Collect Data",
      },
      {
        id: "item-2",
        title: "Collect Icons",
      },
      {
        id: "item-1",
        title: "Make Project Layout",
      },
    ],
  },
  {
    boardId: activitiesBoards[3].id,
    id: "2e09c2fc-9d92-4df1-a3cc-bd8c8c51d85c",
    title: "Elaboração de Planta Baixa",
    name: "Pastor Eduardo",
    phone: "(99) 99999-9999",
    desc: "Finalizar o detalhamento da planta baixa para aprovação do cliente",
    status: "inprogress",
    tags: ["MÉDIA", "PROJETO"],
    priority: "high",
    assign: [
      {
        name: "João",
        image: avatar1,
      },
      {
        name: "Maria",
        image: avatar2,
      },
    ],
    image: "",
    category: "ui & ux",
    pages: "0/7",
    messageCount: "05",
    link: "02",
    date: "02/04/2025",
    time: "17:30",
    list: [
      {
        id: "item-1",
        title: "Collect Data",
      },
      {
        id: "item-2",
        title: "Collect Icons",
      },
      {
        id: "item-1",
        title: "Make Project Layout",
      },
    ],
  },
];

export type activityTaskType = (typeof activitiesTasks)[number];
