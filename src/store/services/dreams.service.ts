import { isLoggedIn } from "../selectors";
import { useDreams } from "../store";
import { dreamsResponseToDreams } from "../types";

export const dreamsService = {
  async getDreams() {
    const { setDreams, api } = useDreams.getState();
    if (!api) return;
    const loggedIn = isLoggedIn();
    const resp = loggedIn ? await api.dreams.privateList() : await api.dreams.dreamsList();
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
    const date = new Date();
    const resp = await api.dreams.dreamsCreate({ date: date.toISOString() });

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
