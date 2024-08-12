type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deliverIt: string | null;
  quickAccess: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

type TaskFilterProps = {
  search: string;
  status: string;
  priority: string;
  order: string;
  tasks: Task[];
};

export const TaskFilter = ({
  search,
  status,
  priority,
  order,
  tasks,
}: TaskFilterProps): Task[] => {
  const filteredTasks = tasks.filter((task) => {
    const searchMatch =
      task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      task.description.toLocaleLowerCase().includes(search.toLocaleLowerCase());

    const statusMatch = status
      ? task.status.toLocaleLowerCase() === status.toLocaleLowerCase() ||
        status.toLocaleLowerCase() === "todos"
      : true;

    const priorityMatch = priority
      ? task.priority.toLocaleLowerCase() === priority.toLocaleLowerCase() ||
        priority.toLocaleLowerCase() === "todos"
      : true;

    return searchMatch && statusMatch && priorityMatch;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (order === "reciente") {
      return b.createdAt.getTime() - a.createdAt.getTime();
    }
    if (order === "titulo") {
      return a.title.localeCompare(b.title);
    }
    if (order === "prioridad") {
      const priorityOrder: { [key: string]: number } = {
        Alto: 1,
        Medio: 2,
        Bajo: 3,
      };

      const aPriority = priorityOrder[a.priority] || 0;
      const bPriority = priorityOrder[b.priority] || 0;

      return aPriority - bPriority;
    }

    if (order === "estado") {
      const priorityOrder: { [key: string]: number } = {
        Pendiente: 1,
        "En progreso": 2,
        Completado: 3,
      };

      // Asigna valores numéricos para las prioridades de `a` y `b`
      const aPriority = priorityOrder[a.priority] || 0;
      const bPriority = priorityOrder[b.priority] || 0;

      return aPriority - bPriority;
    }
    return 0;
  });

  return sortedTasks;
};
