import { StateCreator } from "zustand";

import { DreamsSlice, DreamsState, StoreSlice } from "../interface";
import { Dreams } from "../types";

const createInitialState = (): DreamsState => ({
  dreams: [],
  scrollPosition: 0,
  dreamCategoryFilter: null,
});

export const createDreamsSlice: StateCreator<
  StoreSlice,
  [["zustand/immer", never]],
  [],
  DreamsSlice
> = (set) => ({
  ...createInitialState(),
  resetDreams: () => set(createInitialState()),
  setDreams: (dreams: Dreams) => {
    set((draft: DreamsState) => {
      draft.dreams = dreams.sort((a, b) => b.date.since(a.date).milliseconds);
    });
  },
  setScrollPosition: (pos: number) => {
    set((draft: DreamsState) => {
      draft.scrollPosition = pos;
    });
  },

  setDreamCategoryFilter: (catId: number | null) => {
    set((draft: DreamsState) => {
      draft.dreamCategoryFilter = catId;
    });
  },
});
