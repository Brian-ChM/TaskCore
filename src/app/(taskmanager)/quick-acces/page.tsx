import { FilterSection } from "@/components/filter-section";
import { QuickAccesSection } from "@/components/QuickAccesSection";
import { getTasks } from "@/lib/actions";

export default async function QuickAccess() {
  const tasksData = await getTasks();

  return (
    <div className="flex flex-col flex-1 gap-2 items-center m-2 bg-primary-foreground rounded-md">
      <FilterSection />
      <QuickAccesSection tasksData={tasksData.data} />
    </div>
  );
}
