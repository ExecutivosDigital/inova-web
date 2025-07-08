"use client";
import { useEffect, useState } from "react";

// DnD
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

// Components
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { ProgrammingProps } from "@/@types/programming";
import { useApiContext } from "@/context/ApiContext";
import { ProgrammingList } from "@/mock/programming";
import moment from "moment";
import { NewRouteProgramModal } from "../NewRouteProgramModal";
import { RouteProgramModal } from "../RouteProgramModal";
import Board from "./board";
import Task from "./task";
import TaskHeader from "./task-header";

interface Board {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export interface Users {
  users: User[];
}

export interface Boards {
  color: string;
  id: string;
  name: string;
  pages: number;
  position: number;
  routes: ProgrammingProps[];
}
export default function DnDKitGuide() {
  const { PutAPI } = useApiContext();
  const [boards, setBoards] = useState<Boards[]>([
    {
      color: "#ed6842",
      id: "board-1",
      name: "Segunda",
      pages: 1,
      position: 1,
      routes: [],
    },
    {
      color: "#ed6842",
      id: "board-2",
      name: "Terça",
      pages: 1,
      position: 2,
      routes: [
        {
          id: "1",
          workers: [
            {
              value: "Gabriel",
              label: "Gabriel",
            },
          ],
          selectedOss: [
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
              selected: true,
            },
          ],
          startDate: moment().add(1, "hour").startOf("hour").toDate(),
          endDate: moment().add(2, "hour").startOf("hour").toDate(),
        },
      ],
    },
    {
      color: "#ed6842",
      id: "board-3",
      name: "Quarta",
      pages: 1,
      position: 3,
      routes: [],
    },
    {
      color: "#ed6842",
      id: "board-4",
      name: "Quinta",
      pages: 1,
      position: 4,
      routes: [],
    },
    {
      color: "#ed6842",
      id: "board-5",
      name: "Sexta",
      pages: 1,
      position: 5,
      routes: [],
    },
    {
      color: "#ed6842",
      id: "board-6",
      name: "Sábado",
      pages: 1,
      position: 6,
      routes: [],
    },
    {
      color: "#ed6842",
      id: "board-7",
      name: "Domingo",
      pages: 1,
      position: 7,
      routes: [],
    },
  ]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [isClientSet] = useState<string | null | boolean>(null);
  const [newClientBoardId, setNewClientBoardId] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<ProgrammingProps | null>(
    null,
  );
  const [openRouteProgramModal, setOpenRouteProgramModal] =
    useState<boolean>(false);
  const [openNewRouteProgramModal, setOpenNewRouteProgramModal] =
    useState<boolean>(false);

  // Find the value of the items
  function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === "board") {
      return boards.find((item) => item.id === id);
    }
    if (type === "item") {
      return boards.find((board) =>
        board.routes.find((item) => item.id === id),
      );
    }
  }

  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  async function HandleEditClient(id: string, boardId: string) {
    const editClient = await PutAPI(
      `/lead/${id}`,
      {
        boardId,
      },
      true,
    );
    if (editClient.status === 200) {
      setNewClientBoardId(null);

      const newBoards = boards.map((board) => ({
        ...board,
        routes: board.routes.map((lead) =>
          lead.id === id ? { ...lead, boardId } : lead,
        ),
      }));
      setBoards(newBoards);
      return setActiveId(null);
    }
    return alert("Ocorreu um erro ao mover o cliente");
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;
    // Handle Items Sorting
    if (
      active?.data?.current?.type.toString().includes("item") &&
      over?.data?.current?.type.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active board and over board
      const activeBoard = findValueOfItems(active.id, "item");
      const overBoard = findValueOfItems(over.id, "item");

      // If the active or over board is not found, return
      if (!activeBoard || !overBoard) return;

      // Find the index of the active and over board
      const activeBoardIndex = boards.findIndex(
        (board) => board.id === activeBoard.id,
      );
      const overBoardIndex = boards.findIndex(
        (board) => board.id === overBoard.id,
      );

      // Find the index of the active and over item
      const activeitemIndex = activeBoard.routes.findIndex(
        (item) => item.id === active.id,
      );
      const overitemIndex = overBoard.routes.findIndex(
        (item) => item.id === over.id,
      );
      // In the same board
      if (activeBoardIndex === overBoardIndex) {
        const newItems = [...boards];
        newItems[activeBoardIndex].routes = arrayMove(
          newItems[activeBoardIndex].routes,
          activeitemIndex,
          overitemIndex,
        );

        setBoards(newItems);
      } else {
        // In different boards
        const newItems = [...boards];
        const [removeditem] = newItems[activeBoardIndex].routes.splice(
          activeitemIndex,
          1,
        );
        newItems[overBoardIndex].routes.splice(overitemIndex, 0, removeditem);
        setBoards(newItems);
      }
    }

    // Handling Item Drop Into a Board
    if (
      active?.data?.current?.type.toString().includes("item") &&
      over?.data?.current?.type.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over board
      const activeBoard = findValueOfItems(active.id, "item");
      const overBoard = findValueOfItems(over.id, "board");

      // If the active or over board is not found, return
      if (!activeBoard || !overBoard) return;

      // Find the index of the active and over board
      const activeBoardIndex = boards.findIndex(
        (board) => board.id === activeBoard.id,
      );
      const overBoardIndex = boards.findIndex(
        (board) => board.id === overBoard.id,
      );

      // Find the index of the active and over item
      const activeitemIndex = activeBoard.routes.findIndex(
        (item) => item.id === active.id,
      );

      // Remove the active item from the active board and add it to the over board
      const newItems = [...boards];
      const [removeditem] = newItems[activeBoardIndex].routes.splice(
        activeitemIndex,
        1,
      );
      newItems[overBoardIndex].routes.push(removeditem);
      setBoards(newItems);
    }
  };

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Handling item Sorting
    if (
      active?.data?.current?.type.toString().includes("item") &&
      over?.data?.current?.type.toString().includes("item") &&
      active &&
      over
    ) {
      // Find the active and over board
      const activeBoard = findValueOfItems(active.id, "item");
      const overBoard = findValueOfItems(over.id, "item");

      // If the active or over board is not found, return
      if (!activeBoard || !overBoard) return;
      setNewClientBoardId(overBoard?.id);
      // Find the index of the active and over board
      const activeBoardIndex = boards.findIndex(
        (board) => board.id === activeBoard.id,
      );
      const overBoardIndex = boards.findIndex(
        (board) => board.id === overBoard.id,
      );
      // Find the index of the active and over item
      const activeitemIndex = activeBoard.routes.findIndex(
        (item) => item.id === active.id,
      );
      const overitemIndex = overBoard.routes.findIndex(
        (item) => item.id === over.id,
      );

      // In the same board
      if (activeBoardIndex === overBoardIndex) {
        const newItems = [...boards];
        newItems[activeBoardIndex].routes = arrayMove(
          newItems[activeBoardIndex].routes,
          activeitemIndex,
          overitemIndex,
        );
        setBoards(newItems);
        HandleEditClient(active.id as string, overBoard.id);
      } else {
        // In different boards
        const newItems = [...boards];
        const [removeditem] = newItems[activeBoardIndex].routes.splice(
          activeitemIndex,
          1,
        );
        newItems[overBoardIndex].routes.splice(overitemIndex, 0, removeditem);
        setBoards(newItems);
      }
    }
    // }
    // Handling item dropping into Board
    if (
      active?.data?.current?.type.toString().includes("item") &&
      over?.data?.current?.type.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over board
      const activeBoard = findValueOfItems(active.id, "item");
      const overBoard = findValueOfItems(over.id, "board");

      // If the active or over board is not found, return
      if (!activeBoard || !overBoard) return;
      // Find the index of the active and over board
      const activeBoardIndex = boards.findIndex(
        (board) => board.id === activeBoard.id,
      );
      const overBoardIndex = boards.findIndex(
        (board) => board.id === overBoard.id,
      );
      // Find the index of the active and over item
      const activeitemIndex = activeBoard.routes.findIndex(
        (item) => item.id === active.id,
      );

      const newItems = [...boards];
      const [removeditem] = newItems[activeBoardIndex].routes.splice(
        activeitemIndex,
        1,
      );
      newItems[overBoardIndex].routes.push(removeditem);
      setBoards(newItems);
    }
  }

  useEffect(() => {
    if (newClientBoardId && activeId && isClientSet) {
      HandleEditClient(activeId as string, newClientBoardId);
    }
  }, [newClientBoardId, activeId, isClientSet]);

  const [inputText, setInputText] = useState<string>("");

  return (
    <>
      <Card className="overflow-y-auto">
        <CardHeader className="mb-6 border-none pt-6">
          <TaskHeader
            openCreateBoard={() => setOpenNewRouteProgramModal(true)}
            setInputText={setInputText}
            inputText={inputText}
          />
        </CardHeader>
        <CardContent>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          >
            <div className="overflow-x-auto">
              <div className="flex flex-nowrap gap-6 pb-4">
                {boards.map((board) => (
                  <Board board={board} key={board.id}>
                    <SortableContext
                      items={board.routes
                        .filter((i) =>
                          inputText
                            ? i.id
                                .toLowerCase()
                                .includes(inputText.toLowerCase())
                            : true,
                        )
                        .map((i) => i.id)}
                    >
                      {board.routes
                        .filter((i) =>
                          inputText
                            ? i.id
                                .toLowerCase()
                                .includes(inputText.toLowerCase())
                            : true,
                        )
                        .map((route) => (
                          <Task
                            key={route.id}
                            route={route}
                            onClick={() => {
                              setOpenRouteProgramModal(true);
                              setSelectedRoute(route);
                            }}
                          />
                        ))}
                    </SortableContext>
                  </Board>
                ))}
              </div>
            </div>
            <DragOverlay adjustScale={false}>
              {activeId &&
                activeId ===
                  boards
                    .find((b) => b.routes.some((i) => i.id === activeId))
                    ?.routes.find((i) => i.id === activeId)?.id && (
                  <Task route={ProgrammingList[0]} onClick={() => {}} />
                )}
            </DragOverlay>
          </DndContext>
        </CardContent>
      </Card>

      {selectedRoute && (
        <RouteProgramModal
          open={openRouteProgramModal}
          onClose={() => {
            setOpenRouteProgramModal(false);
            setSelectedRoute(null);
          }}
          selectedRoute={selectedRoute}
        />
      )}
      {openNewRouteProgramModal && (
        <NewRouteProgramModal
          open={openNewRouteProgramModal}
          onClose={() => setOpenNewRouteProgramModal(false)}
        />
      )}
    </>
  );
}
