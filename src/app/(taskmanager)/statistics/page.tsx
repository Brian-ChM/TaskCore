import StatisticsSection from "@/components/statistics-section";
import { getTasks } from "@/lib/actions";

export default async function Statistics() {
  const tasks = await getTasks();

  return (
    <section className="m-2 flex flex-col justify-center items-center content-start gap-2 bg-primary-foreground h-[calc(100vh-16px)] w-full overflow-auto rounded-md p-2">
      <StatisticsSection type={"status"} tasks={tasks.data} />
      <StatisticsSection type={"priority"} tasks={tasks.data} />
    </section>
  );
}
