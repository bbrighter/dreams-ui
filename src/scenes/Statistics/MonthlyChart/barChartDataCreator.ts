export const createSeries = (
  categories: Array<{ id: number }>,
  label: string,
  selectedId: number,
) => {
  const series = [{ dataKey: "selected", label: label, stack: "all", color: "#0b22f7" }];
  if (categories.some((d) => d.id == selectedId)) {
    series.push({ dataKey: "unselected", label: "Sonstige", stack: "all", color: "#9c9c9c" });
  }
  return series;
};

export const createDataSet = (
  statistics: Array<{ categoryCount: Map<number, number>; numberOfDreams: number; month: string }>,
  selectedId: number,
) => {
  return statistics.map((s) => {
    const selected = selectedId > 0 ? (s.categoryCount.get(selectedId) ?? 0) : s.numberOfDreams;
    const unselected = s.numberOfDreams - selected;
    return { selected: selected, unselected: unselected, month: s.month };
  });
};
