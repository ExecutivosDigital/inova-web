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

import { activitySubTaskType } from "@/@staticData/activities/subtasks";
import { activityTaskType } from "@/@staticData/activities/tasks";
import { useApiContext } from "@/context/ApiContext";
import Board from "./board";
import EditClient from "./EditClient";
import Task from "./task";
import TaskHeader from "./task-header";
import TaskSheet from "./task-sheet";

interface Board {
  id: string;
  name: string;
}
interface DndKitGuideProps {
  subTasks: activitySubTaskType[];
}

interface User {
  id: string;
  name: string;
  email: string;
}

export interface Users {
  users: User[];
}
export interface Proposal {
  allServicesValue: null | string;
  architectureAnd3dValue: null | string;
  architectureValue: null | string;
  callDate: string; // e.g., "2025-05-28T04:00:00.000Z"
  callTime: string; // e.g., "14:00"
  capacity: string; // e.g., "ENTRE 100 E 200 PESSOAS"
  churchHeight: string;
  churchName: string;
  churchWidth: string;
  city: string; // e.g., "Érico Cardoso"
  client: null | string;
  country: string; // e.g., "Brasil"
  createdAt: string; // e.g., "2025-05-28T18:46:40.656Z"
  description: string;
  expectedProjectValue: string; // e.g., "ENTRE 15 E 30 MIL REAIS"
  expirationDate: null | string;
  goal: string; // e.g., "Contruir"
  proposalTypeId?: string;
  proposalStatusId?: string;
  haveOtherProposals: boolean;
  id: string; // e.g., "7ffa5d50-d9f5-4de4-91df-9f4b28d3457d"
  lastName: string;
  name: string;
  phone: string; // e.g., "(56) 6666-6666"
  proposalStatus: {
    color: string; // e.g., "#0000"
    id: string; // e.g., "c898767a-60fd-4712-bf37-be23fc88033d"
    name: string; // e.g., "Não enviada"
    position: number;
  };
  proposalLink: string;
  proposalType: {
    color: string; // e.g., "#00000"
    description: string; // e.g., "TENHO UM TERRENO E QUERO CONSTRUIR UMA IGREJA."
    id: string; // e.g., "1cdba644-a54e-4d13-ab96-2e59ed91085a"
    name: string; // e.g., "Contruir"
  };
  role: string; // e.g., "Pastor"
  state: string; // e.g., "Bahia"
  targetValue: string; // e.g., "ATÉ 300 MIL"
  updatedAt: string; // e.g., "2025-05-28T18:46:40.657Z"
}
export interface Boards {
  color: string;
  id: string;
  name: string;
  pages: number;
  position: number;
  proposals: Proposal[];
}
export default function DnDKitGuide({ subTasks }: DndKitGuideProps) {
  const { PutAPI } = useApiContext();
  const [boards, setBoards] = useState<Boards[]>([
    {
      color: "#ed6842",
      id: "board-1",
      name: "Segunda",
      pages: 1,
      position: 1,
      proposals: [],
    },
    {
      color: "#ed6842",
      id: "board-2",
      name: "Terça",
      pages: 1,
      position: 2,
      proposals: [],
    },
    {
      color: "#ed6842",
      id: "board-3",
      name: "Quarta",
      pages: 1,
      position: 3,
      proposals: [],
    },
    {
      color: "#ed6842",
      id: "board-4",
      name: "Quinta",
      pages: 1,
      position: 4,
      proposals: [],
    },
    {
      color: "#ed6842",
      id: "board-5",
      name: "Sexta",
      pages: 1,
      position: 5,
      proposals: [],
    },
  ]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [open3, setOpen3] = useState<boolean>(false);
  const [selectedTask] = useState<activityTaskType | undefined>(undefined);
  const [selectedTaskId] = useState<activityTaskType["id"] | undefined>(
    undefined,
  );
  const [isClientSet] = useState<string | null | boolean>(null);
  const [newClientBoardId, setNewClientBoardId] = useState<string | null>(null);
  const [openEditSheet, setOpenEditSheet] = useState(false);

  const openCreateBoard = () => {
    console.log("open: ", open);
    setOpen(true);
  };

  // const closeCreateBoard = () => {
  //   setOpen(false);
  // };

  const closeUpdateTaskHandler = () => {
    setOpen3(false);
  };

  // Find the value of the items
  function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === "board") {
      return boards.find((item) => item.id === id);
    }
    if (type === "item") {
      return boards.find((board) =>
        board.proposals.find((item) => item.id === id),
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
        proposals: board.proposals.map((lead) =>
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
      const activeitemIndex = activeBoard.proposals.findIndex(
        (item) => item.id === active.id,
      );
      const overitemIndex = overBoard.proposals.findIndex(
        (item) => item.id === over.id,
      );
      // In the same board
      if (activeBoardIndex === overBoardIndex) {
        const newItems = [...boards];
        newItems[activeBoardIndex].proposals = arrayMove(
          newItems[activeBoardIndex].proposals,
          activeitemIndex,
          overitemIndex,
        );

        setBoards(newItems);
      } else {
        // In different boards
        const newItems = [...boards];
        const [removeditem] = newItems[activeBoardIndex].proposals.splice(
          activeitemIndex,
          1,
        );
        newItems[overBoardIndex].proposals.splice(
          overitemIndex,
          0,
          removeditem,
        );
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
      const activeitemIndex = activeBoard.proposals.findIndex(
        (item) => item.id === active.id,
      );

      // Remove the active item from the active board and add it to the over board
      const newItems = [...boards];
      const [removeditem] = newItems[activeBoardIndex].proposals.splice(
        activeitemIndex,
        1,
      );
      newItems[overBoardIndex].proposals.push(removeditem);
      setBoards(newItems);
    }
  };

  // This is the function that handles the sorting of the boards and items when the user is done dragging.
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
      const activeitemIndex = activeBoard.proposals.findIndex(
        (item) => item.id === active.id,
      );
      const overitemIndex = overBoard.proposals.findIndex(
        (item) => item.id === over.id,
      );

      // In the same board
      if (activeBoardIndex === overBoardIndex) {
        const newItems = [...boards];
        newItems[activeBoardIndex].proposals = arrayMove(
          newItems[activeBoardIndex].proposals,
          activeitemIndex,
          overitemIndex,
        );
        setBoards(newItems);
        HandleEditClient(active.id as string, overBoard.id);
      } else {
        // In different boards
        const newItems = [...boards];
        const [removeditem] = newItems[activeBoardIndex].proposals.splice(
          activeitemIndex,
          1,
        );
        newItems[overBoardIndex].proposals.splice(
          overitemIndex,
          0,
          removeditem,
        );
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
      const activeitemIndex = activeBoard.proposals.findIndex(
        (item) => item.id === active.id,
      );

      const newItems = [...boards];
      const [removeditem] = newItems[activeBoardIndex].proposals.splice(
        activeitemIndex,
        1,
      );
      newItems[overBoardIndex].proposals.push(removeditem);
      setBoards(newItems);
    }
  }

  useEffect(() => {
    if (newClientBoardId && activeId && isClientSet) {
      HandleEditClient(activeId as string, newClientBoardId);
    }
  }, [newClientBoardId, activeId, isClientSet]);

  // useEffect(() => {
  //   setQueryFilter("");
  //   setSelectedPage(1);
  // }, []);
  const [selectedLead, setSelectedLead] = useState<Proposal | null>(null);
  function handleEditSheet(task: Proposal) {
    setSelectedLead(task);
    setOpenEditSheet(true);
  }

  const [selectedFilter] = useState<string>("status");
  const [inputText, setInputText] = useState<string>("");
  const { GetAPI } = useApiContext();
  async function getProposalsByStatus() {
    const result = await GetAPI("/proposal-status/proposals", true);
    console.log("resultado status", result.body.status);
    setBoards(result.body.status);
  }
  async function getProposalsByType() {
    const result = await GetAPI("/proposal-type/proposals", true);
    console.log("resultado type", result);
    setBoards(result.body.types);
  }
  async function handleGetProposals() {
    if (selectedFilter === "status") {
      await getProposalsByStatus();
    }
    if (selectedFilter === "type") {
      await getProposalsByType();
    }
  }
  useEffect(() => {
    handleGetProposals();
  }, [selectedFilter]);

  return (
    <>
      {/* {!isBoardsLoading ? ( */}
      <Card className="overflow-y-auto">
        <CardHeader className="mb-6 border-none pt-6">
          <TaskHeader
            openCreateBoard={openCreateBoard}
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
                      items={board.proposals
                        .filter((i) =>
                          inputText
                            ? i.name
                                .toLowerCase()
                                .includes(inputText.toLowerCase())
                            : true,
                        )
                        .map((i) => i.id)}
                    >
                      {board.proposals
                        .filter((i) =>
                          inputText
                            ? i.name
                                .toLowerCase()
                                .includes(inputText.toLowerCase())
                            : true,
                        )
                        .map((i) => (
                          <Task
                            setOpenEditSheet={(e) => {
                              handleEditSheet(e);
                            }}
                            client={i}
                            key={i.id}
                          />
                        ))}
                    </SortableContext>
                  </Board>
                ))}
              </div>
            </div>
            <DragOverlay adjustScale={false}>
              {/* Drag Overlay For item Item */}
              {activeId &&
                activeId ===
                  boards
                    .find((b) => b.proposals.some((i) => i.id === activeId))
                    ?.proposals.find((i) => i.id === activeId)?.id && (
                  <Task
                    client={
                      boards
                        .find((b) => b.proposals.some((i) => i.id === activeId))
                        ?.proposals.find((i) => i.id === activeId) ??
                      ({} as Proposal)
                    }
                  />
                )}
            </DragOverlay>
          </DndContext>
        </CardContent>
      </Card>
      {/* ) : (
        <Card className="overflow-y-auto">
          <CardHeader className="mb-6 border-none pt-6">
            <TaskHeader taskView="kanban" openCreateBoard={openCreateBoard} />
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="flex flex-nowrap gap-6 pb-4">
                {[0, 1, 2, 3].map((index) => (
                  <BoardSkeleton key={index}>
                    {[0, 1, 2].map((index) => (
                      <TaskSkeleton key={index} />
                    ))}
                  </BoardSkeleton>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )} */}
      {/* {open && (
        <CreateClient
          open={open}
          handleRefresh={() => handleGetProposals()}
          onClose={closeCreateBoard}
        />
      )} */}
      {openEditSheet && (
        <EditClient
          onClose={() => {
            setOpenEditSheet(false);
            setSelectedLead(null);
          }}
          data={selectedLead}
          open={openEditSheet}
          handleRefresh={() => handleGetProposals()}
        />
      )}

      <TaskSheet
        open={open3}
        onClose={closeUpdateTaskHandler}
        task={selectedTask as activityTaskType}
        taskId={selectedTaskId as activityTaskType["id"]}
        subTasks={subTasks}
      />
    </>
  );
}
