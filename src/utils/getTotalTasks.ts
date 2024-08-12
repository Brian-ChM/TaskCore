export const getTotalTasks = (data: any) => {
  const totalTasks = data.length;
  const pendingTasks = data.filter(
    (task: any) => task.status === "pendiente"
  ).length;
  const inprogressTasks = data.filter(
    (task: any) => task.status === "en progreso"
  ).length;
  const completedTasks = data.filter(
    (task: any) => task.status === "completado"
  ).length;
  const hightasks = data.filter((task: any) => task.priority === "alto").length;
  const mediumtasks = data.filter(
    (task: any) => task.priority === "medio"
  ).length;
  const lowtasks = data.filter((task: any) => task.priority === "bajo").length;
  return {
    totalTasks,
    pendingTasks,
    inprogressTasks,
    completedTasks,
    hightasks,
    mediumtasks,
    lowtasks,
  };
};
