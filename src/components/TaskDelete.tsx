import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { deleteTask } from "@/lib/actions";
import { useRouter } from "next/navigation";

export const TaskDelete = ({ id }: { id: string }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await deleteTask(id);
      router.refresh();
    } catch (error) {
      console.error("Error borrando la tarea:", error);
    }
  };
  return (
    <Button
      onClick={handleDelete}
      variant="ghost"
      className="h-min w-min p-2 rounded-full"
      size="icon"
    >
      <Trash2 className="w-5 h-5 text-red-400" />
    </Button>
  );
};
