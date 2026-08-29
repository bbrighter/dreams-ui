import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { createApiSlice } from "./api";
import { createAuthSlice } from "./auth";
import { createCategoriesSlice } from "./categories";
import { createDreamSlice } from "./dream";
import { createDreamsSlice } from "./dreams";
import { StoreSlice } from "./interface";
import { createStatisticSlice } from "./statistics";

export const useDreams = create<StoreSlice>()(
  immer((...a) => {
    const categories = createCategoriesSlice(...a);
    const dream = createDreamSlice(...a);
    const dreams = createDreamsSlice(...a);
    const auth = createAuthSlice(...a);
    const statistics = createStatisticSlice(...a);
    const api = createApiSlice(...a);

    return {
      ...categories,
      ...dream,
      ...dreams,
      ...auth,
      ...statistics,
      ...api,
    };
  }),
);
