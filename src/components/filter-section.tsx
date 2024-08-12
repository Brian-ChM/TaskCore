"use client";
import useStore from "@/store/filter-store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const FilterSection = () => {
  const {
    status,
    priority,
    search,
    order,
    setStatus,
    setSearch,
    setPriority,
    setOrder,
  } = useStore();

  return (
    <section className="flex w-full items-center space-x-2 p-2">
      <Select onValueChange={setStatus} value={status}>
        <SelectTrigger className="w-[200px] bg-secondary">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="pendiente">Pendiente</SelectItem>
          <SelectItem value="en progreso">En progreso</SelectItem>
          <SelectItem value="completado">Completado</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setPriority} value={priority}>
        <SelectTrigger className="w-[180px] bg-secondary">
          <SelectValue placeholder="Prioridad" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="alto">Alto</SelectItem>
          <SelectItem value="medio">Medio</SelectItem>
          <SelectItem value="bajo">Bajo</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setOrder} value={order}>
        <SelectTrigger className="w-[180px] bg-secondary">
          <SelectValue placeholder="Ordnenar" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="reciente">Reciente</SelectItem>
          <SelectItem value="titulo">Titulo A-Z</SelectItem>
          <SelectItem value="prioridad">Prioridad</SelectItem>
          <SelectItem value="estado">Estado</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="search"
        placeholder="Buscar tarea"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button variant="secondary" type="submit">
        Buscar
      </Button>
    </section>
  );
};
