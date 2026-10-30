import { MIME_TYPE } from "@/constants";
import { dreamIdStr } from "@/store/selectors";
import { useDreams } from "@/store/store";
import { dreamResponseToDream } from "@/store/types";
import { CategoryType } from "@/store/types/categories.types";
import { respToRecording } from "@/store/types/recording.types";

import { getApiErrorMessage } from "./error";

export const dreamService = {
  getDream: async (id: number) => {
    const { api, setDream, setHash, setRecording } = useDreams.getState();
    if (!api) return;
    const resp = await api.dreams.dreamsDetail(id.toString());
    if (!resp.ok) {
      console.error("error");
    }
    const dream = dreamResponseToDream(resp.data);
    setDream(dream);
    setRecording(respToRecording(resp.data.recording));
    setHash(dream);
  },

  saveDream: async () => {
    const { api, dream, setHash } = useDreams.getState();
    if (!api) return;
    const resp = await api.dreams.dreamsPartialUpdate(dreamIdStr(), {
      date: dream.date.toString({ timeZone: "UTC" }),
      description: dream.description,
      rating: dream.rating ? dream.rating : undefined,
    });
    if (!resp.ok) {
      console.error("error");
      return;
    }
    setHash(dream);
  },

  addNewCategory: async (name: string, type: CategoryType) => {
    const { api, categories, dream, setDreamCategories, setCategories } = useDreams.getState();
    if (!api) return;
    const resp = await api.dreams.categoriesCreate(dreamIdStr(), {
      name: name,
      categoryType: type,
    });
    if (!resp.ok) {
      console.error("error");
      return;
    }
    const catId = resp.data;

    setDreamCategories([...dream.categories, catId]);
    setCategories([...categories, { id: catId, name: name, type: type }]);
  },

  addExistingCategory: async (catId: number) => {
    const { api, dream, setDreamCategories } = useDreams.getState();
    if (!api) return;
    const resp = await api.dreams.categoriesUpdate(dreamIdStr(), catId.toString());
    if (!resp.ok) {
      console.error("error");
      return;
    }

    setDreamCategories([...dream.categories, catId]);
  },

  removeCategory: async (catId: number) => {
    const { api, dream, setDreamCategories } = useDreams.getState();
    if (!api) return;
    const resp = await api.dreams.categoriesDelete(dreamIdStr(), catId.toString());
    if (!resp.ok) {
      console.error("error");
      return;
    }

    setDreamCategories(dream.categories.filter((c) => c !== catId));
  },

  finalize: async () => {
    const { api, setFinalized } = useDreams.getState();
    if (!api) return;
    const resp = await api.dreams.finalizePartialUpdate(dreamIdStr());
    if (!resp.ok) {
      console.error("error");
      return;
    }
    setFinalized();
  },

  startTranscription: async () => {
    const { api, setRecording } = useDreams.getState();
    if (!api) return;

    try {
      const resp = await api.dreams.transcribeCreate(dreamIdStr());
      setRecording(respToRecording(resp.data));
    } catch (err: unknown) {
      const message = getApiErrorMessage(err);
      throw new Error(message, { cause: err });
    }
  },

  updateDescription: async (description: string) => {
    const { api, setDescription } = useDreams.getState();
    if (!api) return;

    const resp = await api.dreams.dreamsPartialUpdate(dreamIdStr(), {
      description: description,
    });
    if (!resp.ok) {
      console.error("error");
      return;
    }
    setDescription(description);
  },

  postRecording: async (blob: Blob) => {
    const { api, setRecording, updateDream } = useDreams.getState();
    if (!api) return;

    const file = new File([blob], "file", { type: MIME_TYPE });

    const resp = await api.dreams.recordingCreate(dreamIdStr(), { file: file });
    if (!resp.ok) {
      console.error("error");
      return;
    }

    const rec = respToRecording(resp.data);
    setRecording(rec);

    updateDream({ recordingId: rec?.id });
  },
};
