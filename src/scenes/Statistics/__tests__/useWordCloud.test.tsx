import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { useDreams } from "@/store/store";

import { useWordCloud } from "../WordCloud/useWordCloud";

describe("useWordCloud", () => {
  beforeEach(() => {
    const store = useDreams.getState();
    store.resetCategories();
    store.resetStatistics();
  });

  it("Person returns persons only", () => {
    const { setCategories, setStatistics } = useDreams.getState();
    setCategories([
      { id: 1, name: "Person", type: "person" },
      { id: 2, name: "Cat", type: "category" },
    ]);
    setStatistics([
      { id: 1, count: 5 },
      { id: 2, count: 10 },
    ]);

    const { result } = renderHook(() => useWordCloud("person"));
    expect(result.current).toHaveLength(1);
    expect(result.current[0]).toStrictEqual({
      id: 1,
      name: "Person",
      type: "person",
      count: 5,
    });
  });

  it("Category returns categories only", () => {
    const { setCategories, setStatistics } = useDreams.getState();
    setCategories([
      { id: 1, name: "Person", type: "person" },
      { id: 2, name: "Cat", type: "category" },
    ]);
    setStatistics([
      { id: 1, count: 5 },
      { id: 2, count: 10 },
    ]);

    const { result } = renderHook(() => useWordCloud("category"));
    expect(result.current).toHaveLength(1);
    expect(result.current[0]).toStrictEqual({
      id: 2,
      name: "Cat",
      type: "category",
      count: 10,
    });
  });

  it("Respects limit and sorts correctly", () => {
    const { setCategories, setStatistics } = useDreams.getState();
    setCategories([
      { id: 1, name: "Person", type: "person" },
      { id: 2, name: "John", type: "person" },
      { id: 3, name: "Jane", type: "person" },
    ]);
    setStatistics([
      { id: 1, count: 5 },
      { id: 2, count: 10 },
      { id: 3, count: 7 },
    ]);

    const { result } = renderHook(() => useWordCloud("person", 2));
    expect(result.current).toHaveLength(2);
    expect(result.current[0].count).toBe(10);
    expect(result.current[1].count).toBe(7);
  });
});
