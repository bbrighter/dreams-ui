import { renderHook } from "@testing-library/react";
import { expect, it } from "vitest";

import { useDreams } from "../../store";
import { useDreamCategories } from "../dream.selectors";

it("useDreamCategories", () => {
  const { setCategories, setDream } = useDreams.getState();
  setCategories([
    { id: 1, name: "Name", type: "category" },
    { id: 2, name: "Name 2", type: "category" },
    { id: 3, name: "Name 3", type: "person" },
  ]);
  setDream({
    id: 1,
    date: new Date(),
    description: "",
    finalized: false,
    rating: null,
    visible: true,
    categories: [1, 3],
  });

  const { result } = renderHook(() => useDreamCategories());
  expect(result.current.categories).toHaveLength(1);
  expect(result.current.persons).toHaveLength(1);
});
