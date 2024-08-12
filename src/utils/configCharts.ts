import { type ChartConfig } from "@/components/ui/chart";

type Props = {
  pendingTasks: number;
  inprogressTasks: number;
  completedTasks: number;
  hightasks: number;
  mediumtasks: number;
  lowtasks: number;
};

export const configCharts = ({
  pendingTasks,
  inprogressTasks,
  completedTasks,
  hightasks,
  mediumtasks,
  lowtasks,
}: Props) => {
  const priority = [
    { priority: "Bajo", count: lowtasks, fill: "var(--color-low)" },
    { priority: "Medio", count: mediumtasks, fill: "var(--color-medium)" },
    { priority: "Alto", count: hightasks, fill: "var(--color-high)" },
  ];

  const status = [
    { status: "Pendientes", count: pendingTasks, fill: "var(--color-pending)" },
    {
      status: "En Progreso",
      count: inprogressTasks,
      fill: "var(--color-inprogress)",
    },
    {
      status: "Completadas",
      count: completedTasks,
      fill: "var(--color-completed)",
    },
  ];

  const statusChartConfig = {
    count: {
      label: "Cantidad",
    },
    pending: {
      label: "Pendientes",
      color: "#4b5563",
    },
    inprogress: {
      label: "En Progreso",
      color: "#2563eb",
    },
    completed: {
      label: "Completadas",
      color: "#16a34a",
    },
  } satisfies ChartConfig;

  const priorityChartConfig = {
    count: {
      label: "Cantidad",
    },
    high: {
      label: "Alto",
      color: "#dc2626",
    },
    medium: {
      label: "Medio",
      color: "#ea580c",
    },
    low: {
      label: "Bajo",
      color: "#16a34a",
    },
  } satisfies ChartConfig;

  return {
    status,
    priority,
    statusChartConfig,
    priorityChartConfig,
  };
};
