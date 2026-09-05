import { dreamIdStr } from "@/store/selectors";
import { useDreams } from "@/store/store";
import { dreamResponseToDream } from "@/store/types";
import { CategoryType } from "@/store/types/categories.types";

export const dreamService = {
  getDream: async (id: number) => {
    const { api, setDream, setHash } = useDreams.getState();
    if (!api) return;
    const resp = await api.dreams.dreamsDetail(id.toString());
    if (!resp.ok) {
      console.error("error");
    }
    const dream = dreamResponseToDream(resp.data);
    setDream(dream);
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

    setDreamCategories(dream.categories.filter((c) => c != catId));
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
};
