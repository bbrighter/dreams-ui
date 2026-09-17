import Box from "@mui/material/Box";
import { useState } from "react";

import { Categories } from "@/store/types/categories.types";
import { MonthlyStatistics } from "@/store/types/statistics.types";

import { DreamBarChart } from "./DreamBarChart";
import SelectData from "./SelectData";

type MonthlyChartProps = {
  statistics: MonthlyStatistics;
  categories: Categories;
  label: string;
};

export function MonthlyChart({ statistics, categories, label }: MonthlyChartProps) {
  const [selectedId, setSelectedId] = useState<number>(0);

  return (
    <Box sx={{ pt: "2rem" }}>
      <SelectData options={categories} value={selectedId} onChange={setSelectedId} />
      <DreamBarChart
        statistics={statistics}
        categories={categories}
        label={label}
        selectedId={selectedId}
      />
    </Box>
  );
}
