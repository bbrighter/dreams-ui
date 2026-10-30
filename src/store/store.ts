import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { createApiSlice } from "./api.slice";
import { createCategoriesSlice } from "./categories.slice";
import { createDreamSlice } from "./dream.slice";
import { createDreamsSlice } from "./dreams.slice";
import { StoreSlice } from "./interface";
import { createRecordingSlice } from "./recording.slice";
import { createStatisticSlice } from "./statistics.slice";

export const useDreams = create<StoreSlice>()(
  immer((...a) => {
    const categories = createCategoriesSlice(...a);
    const dream = createDreamSlice(...a);
    const dreams = createDreamsSlice(...a);
    const statistics = createStatisticSlice(...a);
    const recordings = createRecordingSlice(...a);
    const api = createApiSlice(...a);

    return {
      ...categories,
      ...dream,
      ...dreams,
      ...statistics,
      ...recordings,
      ...api,
    };
  }),
);
