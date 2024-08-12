"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateTask } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { taskSchema } from "@/utils/taskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, FilePenLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

export function TaskUpdate({
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
  const [date, setDate] = useState<Date>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      titulo,
      descripcion,
      estado,
      prioridad,
      fecha: fecha || undefined,
    },
  });

  useEffect(() => {
    setValue("titulo", titulo);
    setValue("descripcion", descripcion);
    setValue("estado", estado);
    setValue("prioridad", prioridad);
    setValue("fecha", fecha || undefined);

    if (fecha) {
      const dateParts = fecha.split("/").map((part) => parseInt(part, 10));
      setDate(new Date(dateParts[2], dateParts[1] - 1, dateParts[0]));
    }
  }, [titulo, descripcion, estado, prioridad, fecha, setValue]);

  const onSubmit = async (data: any) => {
    const { titulo, descripcion, estado, prioridad, fecha } = data;
    try {
      await updateTask(id, titulo, descripcion, estado, prioridad, fecha);
      reset();
      setDate(undefined);
      router.refresh();
      (document.getElementById("dialog-close") as HTMLButtonElement)?.click();
    } catch (error) {
      console.error("Error actualizando tarea:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-min w-min p-2 rounded-full"
          size="icon"
        >
          <FilePenLine className="w-5 h-5 text-blue-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Actualizar tarea</DialogTitle>
          <DialogDescription>
            Haga clic en guardar cambios cuando haya terminado.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="titulo">Título:</Label>
            <Input
              id="titulo"
              {...register("titulo")}
              defaultValue={titulo}
              className="col-span-3"
            />
            {errors.titulo?.message && (
              <p className="text-red-600">{String(errors.titulo.message)}</p>
            )}
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="descripcion">Descripción:</Label>
            <Textarea
              rows={5}
              defaultValue={descripcion}
              className="resize-none"
              placeholder="Escribe la descripción aquí."
              id="descripcion"
              {...register("descripcion")}
            />
            {errors.descripcion?.message && (
              <p className="text-red-600">
                {String(errors.descripcion.message)}
              </p>
            )}
          </div>
          <div className="flex justify-between gap-2">
            <div className="grid w-full gap-1.5">
              <Select
                defaultValue={estado}
                onValueChange={(value) =>
                  setValue("estado", value, { shouldValidate: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    className="text-nowrap rounded-full focus:bg-gray-600 px-3 py-1 text-white"
                    value="pendiente"
                  >
                    Pendiente
                  </SelectItem>
                  <SelectItem
                    className="text-nowrap rounded-full focus:bg-blue-600 px-3 py-1 text-white"
                    value="en progreso"
                  >
                    En progreso
                  </SelectItem>
                  <SelectItem
                    className="text-nowrap rounded-full focus:bg-green-600 px-3 py-1 text-white"
                    value="completado"
                  >
                    Completado
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.estado?.message && (
                <p className="text-red-600">{String(errors.estado.message)}</p>
              )}
            </div>
            <div className="grid w-full gap-1.5">
              <Select
                defaultValue={prioridad}
                onValueChange={(value) =>
                  setValue("prioridad", value, { shouldValidate: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    className="text-nowrap rounded-full focus:bg-red-600 px-3 py-1 text-white"
                    value="alto"
                  >
                    Alto
                  </SelectItem>
                  <SelectItem
                    className="text-nowrap rounded-full focus:bg-orange-600 px-3 py-1 text-white"
                    value="medio"
                  >
                    Medio
                  </SelectItem>
                  <SelectItem
                    className="text-nowrap rounded-full focus:bg-green-600 px-3 py-1 text-white"
                    value="bajo"
                  >
                    Bajo
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.prioridad?.message && (
                <p className="text-red-600">
                  {String(errors.prioridad.message)}
                </p>
              )}
            </div>
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="fecha">Fecha de finalización:</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: es }) : "Seleccionar"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setValue(
                      "fecha",
                      selectedDate?.toLocaleDateString() || undefined
                    );
                  }}
                  initialFocus
                  locale={es}
                />
              </PopoverContent>
            </Popover>
            {errors.fecha?.message && (
              <p className="text-red-600">{String(errors.fecha.message)}</p>
            )}
          </div>
          <DialogFooter>
            <DialogClose id="dialog-close" asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
