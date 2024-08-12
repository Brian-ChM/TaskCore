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
import { CalendarIcon, Plus } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/utils/taskSchema";
import { addTask } from "@/lib/actions";
import { useRouter } from "next/navigation";

export function AddTasks() {
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
  });

  const onSubmit = async (data: any) => {
    const { titulo, descripcion, estado, prioridad, fecha } = data;
    try {
      await addTask(titulo, descripcion, estado, prioridad, fecha);
      reset();
      setDate(undefined);
      router.refresh();
      (document.getElementById("dialog-close") as HTMLButtonElement)?.click();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="absolute right-6 bottom-4 w-min h-min rounded-full transition-colors bg-primary p-2 shadow-md shadow-black/70"
          size="icon"
        >
          <Plus className="w-12 h-12 text-secondary drop-shadow-lg" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agrega una nueva tarea</DialogTitle>
          <DialogDescription>
            Haga clic en guardar cuando haya terminado.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="titulo">Título:</Label>
            <Input id="titulo" {...register("titulo")} className="col-span-3" />
            {errors.titulo?.message && (
              <p className="text-red-600">{String(errors.titulo.message)}</p>
            )}
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="descripcion">Descripción:</Label>
            <Textarea
              rows={5}
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
