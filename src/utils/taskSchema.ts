import { z } from "zod";

export const taskSchema = z.object({
  titulo: z.string().min(1, { message: "El título es obligatorio" }),
  descripcion: z.string().min(1, { message: "La descripción es obligatoria" }),
  estado: z.enum(["pendiente", "en progreso", "completado"], {
    errorMap: () => ({ message: "Selecciona un estado válido" }),
  }),
  prioridad: z.enum(["alto", "medio", "bajo"], {
    errorMap: () => ({ message: "Selecciona una prioridad válida" }),
  }),
  fecha: z.string().optional(),
});
