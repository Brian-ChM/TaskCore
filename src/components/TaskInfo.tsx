"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Info } from "lucide-react";

export function TaskInfo({
  id,
  titulo,
  descripcion,
  estado,
  prioridad,
  fecha,
}: {
  id: string;
  titulo: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  fecha: string | null;
}) {
  const styleTags: any = {
    completado: "bg-green-600",
    "en progreso": "bg-blue-600",
    pendiente: "bg-gray-600",
    alto: "bg-red-600",
    medio: "bg-orange-600",
    bajo: "bg-green-600",
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-min w-min p-2 rounded-full"
          size="icon"
        >
          <Info className="w-5 h-5 text-blue-400" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{titulo}</DialogTitle>
          <DialogDescription>{descripcion}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2">
            <span className="text-muted-foreground inline-flex">
              {fecha ? fecha : "Fecha no definida"}
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`text-nowrap rounded-full h-min w-min px-3 py-1 text-white ${styleTags[estado]}`}
              >
                {estado}
              </span>
              <span
                className={`text-nowrap rounded-full h-min w-min px-3 py-1 text-white ${styleTags[prioridad]}`}
              >
                {prioridad}
              </span>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
