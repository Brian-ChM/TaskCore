import { AddTasks } from "@/components/AddTasks";
import { FilterSection } from "@/components/filter-section";
import { TaskSection } from "@/components/task-section";
import { getTasks } from "@/lib/actions";

export default async function Tasks() {
  const tasksData = await getTasks();

  return (
    <div className="relative flex flex-col flex-1 gap-2 items-center m-2 bg-primary-foreground rounded-md">
      <FilterSection />
      <TaskSection tasksData={tasksData.data} />
      <AddTasks />
    </div>
  );
}
