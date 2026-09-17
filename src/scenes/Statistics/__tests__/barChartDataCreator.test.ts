import { describe, expect, it } from "vitest";

import { createDataSet, createSeries } from "../MonthlyChart/barChartDataCreator";

describe("createSeries", () => {
  it("No id selected", () => {
    const series = createSeries([{ id: 1 }], "Label", 0);

    expect(series).toHaveLength(1);
    expect(series[0]).toStrictEqual({
      color: "#0b22f7",
      stack: "all",
      label: "Label",
      dataKey: "selected",
    });
  });

  it("Id selected", () => {
    const series = createSeries([{ id: 1 }, { id: 2 }], "Label", 1);

    expect(series).toHaveLength(2);
    expect(series[0]).toStrictEqual({
      color: "#0b22f7",
      stack: "all",
      label: "Label",
      dataKey: "selected",
    });
    expect(series[1]).toStrictEqual({
      color: "#9c9c9c",
      stack: "all",
      label: "Sonstige",
      dataKey: "unselected",
    });
  });
});

describe("createDataSet", () => {
  it("No id selected", () => {
    const dataSet = createDataSet(
      [{ categoryCount: new Map([[1, 10]]), month: "2026/09", numberOfDreams: 10 }],
      0,
    );

    expect(dataSet).toHaveLength(1);
    expect(dataSet[0]).toStrictEqual({
      selected: 10,
      unselected: 0,
      month: "2026/09",
    });
  });

  it("ID selected", () => {
    const dataSet = createDataSet(
      [
        {
          categoryCount: new Map([
            [1, 10],
            [2, 5],
          ]),
          month: "2026/09",
          numberOfDreams: 15,
        },
      ],
      1,
    );

    expect(dataSet).toHaveLength(1);
    expect(dataSet[0]).toStrictEqual({
      selected: 10,
      unselected: 5,
      month: "2026/09",
    });
  });

  it("Multiple months", () => {
    const dataSet = createDataSet(
      [
        {
          categoryCount: new Map([
            [1, 10],
            [2, 5],
          ]),
          month: "2026/09",
          numberOfDreams: 15,
        },
        {
          categoryCount: new Map([
            [1, 0],
            [2, 3],
          ]),
          month: "2026/10",
          numberOfDreams: 3,
        },
      ],
      1,
    );

    expect(dataSet).toHaveLength(2);
    expect(dataSet[0]).toStrictEqual({
      selected: 10,
      unselected: 5,
      month: "2026/09",
    });
    expect(dataSet[1]).toStrictEqual({
      selected: 0,
      unselected: 3,
      month: "2026/10",
    });
  });
});
