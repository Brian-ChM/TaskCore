"use client";
import { configCharts } from "@/utils/configCharts";
import { getTotalTasks } from "@/utils/getTotalTasks";
import { Label, Pie, PieChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

type Props = {
  type: "status" | "priority";
  tasks: any;
};

export default function StatisticsSection({ type, tasks }: Props) {
  const {
    pendingTasks,
    inprogressTasks,
    completedTasks,
    hightasks,
    mediumtasks,
    lowtasks,
  } = getTotalTasks(tasks);

  const { status, priority, statusChartConfig, priorityChartConfig } =
    configCharts({
      pendingTasks,
      inprogressTasks,
      completedTasks,
      hightasks,
      mediumtasks,
      lowtasks,
    });

  const chartData =
    type === "status" ? status : type === "priority" ? priority : status;

  const chartConfig =
    type === "status"
      ? statusChartConfig
      : type === "priority"
      ? priorityChartConfig
      : statusChartConfig;

  const handleClick = (data: any) => {
    console.log(data);
  };

  const totalTasks = chartData.reduce((acc, data) => acc + data.count, 0);
  const chartDataWithPercentage = chartData.map((data) => ({
    ...data,
    percentage: ((data.count / totalTasks) * 100).toFixed(0),
  }));

  return (
    <div className="flex justify-start content-start min-h-[200px] w-min">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-4">
          Distribución por {type === "status" ? "Estado" : "Prioridad"}
        </h2>
        <p className="mb-6 w-[25ch] text-balance">
          Un resumen visual de las tareas distribuidas por{" "}
          {type === "status" ? "estado" : "prioridad"}.
        </p>
        <div className="flex justify-start mb-6 gap-2">
          <div className="p-4 border rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-nowrap">
              {type === "status" ? "Pendientes" : "Bajo"}
            </h3>
            <p className="text-2xl font-bold">
              {chartDataWithPercentage[0].percentage}%
            </p>
          </div>
          <div className="p-4 border char rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-nowrap">
              {type === "status" ? "En progreso" : "Medio"}
            </h3>
            <p className="text-2xl font-bold">
              {chartDataWithPercentage[1].percentage}%
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-center max-w-[15rem] lg:max-w-[20rem]">
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] w-[12rem] lg:w-[20rem]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey={type}
              innerRadius={60}
              strokeWidth={5}
              onClick={handleClick}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const totalTasks = chartData.reduce(
                      (acc, data) => acc + data.count,
                      0
                    );
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {chartDataWithPercentage[2].percentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {type === "status" ? "Completadas" : "Alta prioridad"}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  );
}
