import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useMemo, useState } from "react";

import { usePersons, useTags } from "../../../store/selectors";
import { statisticsService } from "../../../store/services";
import { useDreams } from "../../../store/store";
import { CategoryType } from "../../../store/types/categories.types";
import SelectData from "./SelectData";

export function MonthlyChart({ type }: { type: CategoryType }) {
  const [selectedId, setSelectedId] = useState<number>(0);
  const statistics = useDreams((state) => state.monthlyStatistics);
  const tags = useTags();
  const persons = usePersons();
  const categories = useDreams((state) => state.categories);

  useEffect(() => {
    statisticsService.getMonthlyStatistics();
  }, []);

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    setSelectedId(0);
  }, [type]);

  const data: Array<{ id: number; name: string }> = useMemo(
    () => (type == "person" ? persons : tags),
    [type, persons, tags],
  );

  const label = categories.find((c) => c.id == selectedId)?.name ?? "Alle";

  const series = useMemo(() => {
    const series = [{ dataKey: "selected", label: label, stack: "all", color: "#0b22f7" }];
    if (data.some((d) => d.id == selectedId)) {
      series.push({ dataKey: "unselected", label: "Sonstige", stack: "all", color: "#9c9c9c" });
    }
    return series;
  }, [selectedId, data, label]);

  const dataset = useMemo(() => {
    return statistics.map((s) => {
      const selected = selectedId > 0 ? (s.categoryCount.get(selectedId) ?? 0) : s.numberOfDreams;
      const unselected = s.numberOfDreams - selected;
      return { selected: selected, unselected: unselected, month: s.month };
    });
  }, [selectedId, statistics]);

  return (
    <Box sx={{ pt: "2rem" }}>
      <SelectData type={type} options={data} value={selectedId} onChange={setSelectedId} />
      {dataset && (
        <BarChart
          sx={{ height: "400px" }}
          dataset={dataset}
          xAxis={[{ dataKey: "month", label: "Datum" }]}
          series={series}
        />
      )}
    </Box>
  );
}
