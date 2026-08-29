import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { useDreams } from "../../store";
import { useFilteredDreams } from "../dreams.selectors";

describe("useFilteredDreams", () => {
  beforeEach(() => {
    const { setDreams } = useDreams.getState();
    setDreams([
      {
        id: 1,
        categories: [1],
        date: new Date(),
        description: "",
        finalized: false,
        visible: true,
        rating: null,
      },
      {
        id: 2,
        categories: [1, 2, 3],
        date: new Date(),
        description: "",
        finalized: false,
        visible: true,
        rating: null,
      },
    ]);
  });
  it("no filter set, all returned", () => {
    const { setDreamCategoryFilter } = useDreams.getState();
    setDreamCategoryFilter(null);

    const { result } = renderHook(() => useFilteredDreams());
    expect(result.current).toHaveLength(2);
  });

  it("filter set to 1, all dreams included", () => {
    const { setDreamCategoryFilter } = useDreams.getState();
    setDreamCategoryFilter(1);

    const { result } = renderHook(() => useFilteredDreams());
    expect(result.current).toHaveLength(2);
  });

  it("filter set to 2, one dream included", () => {
    const { setDreamCategoryFilter } = useDreams.getState();
    setDreamCategoryFilter(2);

    const { result } = renderHook(() => useFilteredDreams());
    expect(result.current).toHaveLength(1);
    expect(result.current[0].id).toBe(2);
  });
});
