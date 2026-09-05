import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { createApiSlice } from "./api/api.slice";
import { createCategoriesSlice } from "./categories/categories.slice";
import { createDreamSlice } from "./dream/dream.slice";
import { createDreamsSlice } from "./dreams/dreams.slice";
import { StoreSlice } from "./interface";
import { createStatisticSlice } from "./statistics/statistics.slice";

export const useDreams = create<StoreSlice>()(
  immer((...a) => {
    const categories = createCategoriesSlice(...a);
    const dream = createDreamSlice(...a);
    const dreams = createDreamsSlice(...a);
    const statistics = createStatisticSlice(...a);
    const api = createApiSlice(...a);

    return {
      ...categories,
      ...dream,
      ...dreams,
      ...statistics,
      ...api,
    };
  }),
);
