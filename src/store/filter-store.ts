import { create } from "zustand";

type StoreState = {
  search: string;
  status: "todos" | "pendiente" | "en progreso" | "completado";
  priority: "todos" | "alto" | "medio" | "bajo";
  order: "reciente" | "titulo" | "prioridad" | "estado";
  setOrder: (newOrder: "reciente" | "titulo" | "prioridad" | "estado") => void;
  setSearch: (newSearch: string) => void;
  setStatus: (
    newStatus: "todos" | "pendiente" | "en progreso" | "completado"
  ) => void;
  setPriority: (newPriority: "todos" | "alto" | "medio" | "bajo") => void;
};

const useStore = create<StoreState>((set) => ({
  search: "",
  status: "todos",
  priority: "todos",
  order: "reciente",

  setOrder: (newOrder) => {
    set({ order: newOrder });
  },
  setSearch: (newSearch) => set({ search: newSearch }),
  setStatus: (newStatus) => {
    set({ status: newStatus });
  },
  setPriority: (newPriority) => {
    set({ priority: newPriority });
  },
}));

export default useStore;
