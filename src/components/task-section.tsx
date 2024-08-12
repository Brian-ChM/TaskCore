"use client";
import useStore from "@/store/filter-store";
import { TaskFilter } from "@/utils/task-filter";
import { TaskCard } from "./task-card";
import { TaskContainer } from "./task-container";

export const TaskSection = ({ tasksData }: { tasksData: any }) => {
  const { search, order, status, priority } = useStore();
  const tasks = TaskFilter({
    search,
    status,
    priority,
    order,
    tasks: tasksData,
  });

  return (
    <TaskContainer>
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-lg text-primary/70">
            No hay tareas para mostrar.
          </p>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            descripcion={task.description}
            deliverIt={task.deliverIt}
            status={task.status}
            priority={task.priority}
            quickAccess={task.quickAccess}
          />
        ))
      )}
    </TaskContainer>
  );
};
