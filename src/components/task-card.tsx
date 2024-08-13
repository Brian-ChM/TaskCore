"use client";
import { DrawingPinFilledIcon, DrawingPinIcon } from "@radix-ui/react-icons";
import { TaskDelete } from "./TaskDelete";
import { TaskInfo } from "./TaskInfo";
import { TaskUpdate } from "./taskUpdate";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toggleQuickAccess } from "@/lib/actions";
import { useRouter } from "next/navigation";

type TaskCardProps = {
  id: string;
  title: string;
  descripcion: string;
  deliverIt: string | null;
  status: string;
  priority: string;
  quickAccess: boolean;
};

export const TaskCard = ({
  id,
  title,
  descripcion,
  deliverIt,
  status,
  priority,
  quickAccess,
}: TaskCardProps) => {
  const router = useRouter();
  const styleTags: any = {
    completado: "bg-green-600",
    "en progreso": "bg-blue-600",
    pendiente: "bg-gray-600",
    alto: "bg-red-600",
    medio: "bg-orange-600",
    bajo: "bg-green-600",
  };

  const date = deliverIt?.split("/").map((date) => Number(date));
  const formattedDate = date
    ? format(new Date(date[2], date[1] - 1, date[0]), "PPP", {
        locale: es,
      })
    : "No definido";

  const handleClick = async () => {
    await toggleQuickAccess(id, quickAccess);
    router.refresh();
  };

  return (
    <div className="relative flex flex-col gap-3 justify-between border rounded-md w-full min-w-80 bg-primary-foreground h-44 max-h-44 px-6 py-2">
      <Button
        onClick={handleClick}
        variant="ghost"
        className="absolute right-6 top-2"
        size="icon"
      >
        {quickAccess ? (
          <DrawingPinFilledIcon className="w-6 h-6" />
        ) : (
          <DrawingPinIcon className="w-6 h-6" />
        )}
      </Button>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold text-nowrap max-w-[85%] overflow-hidden">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm">
          {descripcion.slice(0, 80) + (descripcion.length > 80 ? "..." : "")}
        </p>
      </div>

      <div className="flex justify-between text-sm items-center text-primary/70">
        <div className="flex flex-col items-start gap-2">
          <span
            className={`text-nowrap rounded-full h-min w-min px-3 py-1 text-white ${styleTags[status]}`}
          >
            {status}
          </span>
          <span className="py-2">{formattedDate}</span>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className={`rounded-full h-min w-min px-3 py-1 text-white ${styleTags[priority]}`}
          >
            {priority}
          </span>
          <div className="flex gap-1">
            <TaskUpdate
              id={id}
              titulo={title}
              descripcion={descripcion}
              estado={status}
              prioridad={priority}
              fecha={deliverIt}
            />
            <TaskInfo
              id={id}
              titulo={title}
              descripcion={descripcion}
              estado={status}
              prioridad={priority}
              fecha={deliverIt}
            />
            <TaskDelete id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};
