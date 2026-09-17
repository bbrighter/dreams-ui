import { BarChart } from "@mui/x-charts/BarChart";
import { useMemo } from "react";

import { Categories } from "@/store/types/categories.types";
import { MonthlyStatistics } from "@/store/types/statistics.types";

import { createDataSet, createSeries } from "./barChartDataCreator";

type DreamBarChartProps = {
  statistics: MonthlyStatistics;
  categories: Categories;
  label: string;
  selectedId: number;
};

export const DreamBarChart = ({
  statistics,
  categories,
  label,
  selectedId,
}: DreamBarChartProps) => {
  const series = useMemo(
    () => createSeries(categories, label, selectedId),
    [selectedId, categories, label],
  );

  const dataset = useMemo(() => createDataSet(statistics, selectedId), [selectedId, statistics]);

  return (
    <BarChart
      sx={{ height: "400px" }}
      dataset={dataset}
      xAxis={[{ dataKey: "month", label: "Datum" }]}
      series={series}
    />
  );
};
