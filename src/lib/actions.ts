"use server";
import prisma from "@/lib/db";
import { auth } from "@/auth";

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

export async function getTasks() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("Usuario no autenticado");
    }

    const tasks = await prisma.task.findMany({
      where: { userId: user?.id },
      orderBy: { createdAt: "asc" },
    });

    return { success: true, message: "Success", data: tasks };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Ocurrió un error desconocido",
    };
  }
}

export async function getTaskById(id: string) {
  try {
    if (!id) {
      throw new Error("El id es requerido");
    }

    const user = await getCurrentUser();

    if (!user) {
      throw new Error("Usuario no autenticado");
    }

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task || task.userId !== user.id) {
      throw new Error("Tarea no encontrada o usuario no autorizado");
    }

    return { success: true, message: "Success", data: task };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "Ocurrió un error desconocido",
    };
  }
}

export async function addTask(
  title: string,
  description: string,
  status: string,
  priority: string,
  deliverIt: string
) {
  try {
    const user = await getCurrentUser();

    if (!user || !user.id) {
      throw new Error("Usuario no autenticado");
    } else if (!title.trim()) {
      throw new Error("Proporcione un título para la tarea.");
    } else if (!description.trim()) {
      throw new Error("Proporcione una descripción para la tarea.");
    }

    await prisma.task.create({
      data: {
        title,
        description,
        userId: user.id,
        status,
        priority,
        deliverIt,
      },
    });

    return { success: true, message: "Tarea guardada!" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: (error as Error).message || "Ocurrió un error desconocido",
    };
  }
}

export async function deleteTask(id: string) {
  try {
    if (!id) {
      throw new Error("Invalid ID");
    }

    const deletedTask = await prisma.task.delete({
      where: { id },
    });

    return deletedTask;
  } catch (error) {
    return { message: "Ocurrió un error al borrar la tarea" };
  }
}

export async function toggleQuickAccess(id: string, quickAccess: boolean) {
  try {
    if (!id) {
      throw new Error("Invalid ID");
    }

    const toggleQuickAccess = await prisma.task.update({
      where: { id },
      data: { quickAccess: !quickAccess },
    });

    return toggleQuickAccess;
  } catch (error) {
    return { message: "Ocurrió un error al cambiar el acceso rápido" };
  }
}

export async function updateTask(
  id: string,
  title: string,
  description: string,
  status: string,
  priority: string,
  deliverIt: string
) {
  try {
    if (!id) {
      throw new Error("Invalid ID");
    } else if (!title.trim()) {
      throw new Error("Proporcione un título para la tarea.");
    } else if (!description.trim()) {
      throw new Error("Proporcione una descripción para la tarea.");
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
        priority,
        deliverIt,
      },
    });

    return updatedTask;
  } catch (error) {
    return { message: "Ocurrió un error al actualizar la tarea" };
  }
}
