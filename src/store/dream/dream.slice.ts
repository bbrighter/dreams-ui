import { Temporal } from "@js-temporal/polyfill";
import { StateCreator } from "zustand";

import { DreamSlice, DreamState, StoreSlice } from "../interface";
import { Dream, hashDream } from "../types";

const createInitialState = (): DreamState => ({
  dream: {
    date: Temporal.Now.instant(),
    description: "",
    finalized: false,
    id: 0,
    categories: [],
    rating: null,
  },
  hash: "",
});

export const createDreamSlice: StateCreator<
  StoreSlice,
  [["zustand/immer", never]],
  [],
  DreamSlice
> = (set) => ({
  ...createInitialState(),
  resetDream: () => set(createInitialState()),

  setDate: (date: Temporal.Instant) => {
    set((draft: DreamState) => {
      draft.dream.date = date;
    });
  },
  setDescription: (description: string) => {
    set((draft: DreamState) => {
      draft.dream.description = description;
    });
  },
  setRating: (rating: number) => {
    set((draft: DreamState) => {
      draft.dream.rating = rating;
    });
  },
  setFinalized: () => {
    set((draft: DreamState) => {
      draft.dream.finalized = true;
    });
  },
  setDream: (dream: Dream) => {
    set((draft: DreamState) => {
      draft.dream = dream;
    });
  },
  setDreamCategories: (cats: Array<number>) => {
    set((draft: DreamState) => {
      draft.dream.categories = cats;
    });
  },
  setHash: (dream: Dream) => {
    set((draft: DreamState) => {
      draft.hash = hashDream(dream);
    });
  },
});
