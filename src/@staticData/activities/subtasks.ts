import { formatDate } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  HelpCircle,
  Timer,
  XCircle,
} from "lucide-react";
import { activitiesTasks } from "./tasks";

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CheckCircle2,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: Timer,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle2,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ChevronDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ChevronRight,
  },
  {
    label: "High",
    value: "high",
    icon: ChevronUp,
  },
];

export function generateAssignments(numAssign: number) {
  const assignObjects = [];

  for (let j = 0; j < numAssign; j++) {
    assignObjects.push({
      image: faker.image.avatarLegacy(),
      label: faker.person.firstName(),
      value: faker.internet.userName(),
    });
  }

  return assignObjects;
}

function generateSubTasks(numItems: number) {
  const data = [];

  for (let i = 1; i <= numItems; i++) {
    const numAssign = faker.number.int({ min: 1, max: 10 });
    const assignObjects = generateAssignments(numAssign);

    const newItem = {
      id: `78032cb9-2170-4e6f-bd3b-33f1480b3fd-${i}`,
      title: faker.hacker.ingverb(),
      status: faker.helpers.arrayElement(statuses).value,
      priority: faker.helpers.arrayElement(priorities).value,
      assign: assignObjects,
      assignDate: formatDate(new Date()),
      dueDate: formatDate(new Date()),
      completed: faker.datatype.boolean(),
      logo: null,
      taskId: activitiesTasks[0].id,
    };
    data.push(newItem);
  }

  return data;
}

export const activitiesSubTasks = generateSubTasks(6);

export type activitySubTaskType = (typeof activitiesSubTasks)[number];
