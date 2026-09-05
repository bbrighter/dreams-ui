import { Temporal } from "@js-temporal/polyfill";

import { useDreams } from "@/store/store";
import { dreamsResponseToDreams } from "@/store/types";

export const dreamsService = {
  async getDreams() {
    const { setDreams, api } = useDreams.getState();
    if (!api) return;
    const resp = await api.dreams.dreamsList();
    if (!resp.ok) {
      console.error("error");
      return;
    }
    setDreams(dreamsResponseToDreams(resp.data));
  },

  async deleteDream(dreamId: number) {
    const { setDreams, dreams, api } = useDreams.getState();
    if (!api) return;
    const dreamIdStr = dreamId.toString();
    const resp = await api.dreams.dreamsDelete(dreamIdStr);
    if (!resp.ok) {
      console.error("error");
      return;
    }
    setDreams(dreams.filter((d) => d.id != dreamId));
  },

  async postDream(): Promise<number> {
    const { setDreams, dreams, api } = useDreams.getState();
    if (!api) return 0;
    const date = Temporal.Now.instant();
    const resp = await api.dreams.dreamsCreate({
      date: date.toString({ timeZone: "UTC" }),
      description: "",
    });

    if (!resp.ok) {
      console.error("error");
      return 0;
    }

    const dream = {
      date: date,
      id: resp.data,
      finalized: false,
      isSaved: true,
      description: "",
      visible: true,
      rating: null,
      categories: [],
    };
    setDreams([dream, ...dreams]);
    return resp.data;
  },
};
