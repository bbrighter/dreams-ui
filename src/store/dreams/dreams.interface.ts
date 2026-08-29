import { Dreams } from "../types";

export interface DreamsState {
  dreams: Dreams;
  scrollPosition: number;
  dreamCategoryFilter: number | null;
}

interface DreamsActions {
  resetDreams: () => void;
  setDreams: (dreams: Dreams) => void;
  setScrollPosition: (pos: number) => void;
  setDreamCategoryFilter: (catId: number | null) => void;
}

export type DreamsSlice = DreamsState & DreamsActions;
