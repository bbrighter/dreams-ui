import { EntityCategoryType } from "@/api/generated_api";
import { selectCategory } from "@/store/selectors";
import { useDreams } from "@/store/store";
import { categoriesResponseToCategories } from "@/store/types/categories.types";

export const categoriesService = {
  async list() {
    const { setCategories, api, setCategoriesLoaded, categoriesLoaded } = useDreams.getState();
    if (categoriesLoaded) return;
    if (!api) return;
    const resp = await api.categories.categoriesList();

    if (!resp.ok) {
      console.error("error");
      return;
    }

    const categories = categoriesResponseToCategories(resp.data);

    setCategories(categories);
    setCategoriesLoaded(true);
  },

  async rename(id: number, newName: string) {
    const { renameCategory, api } = useDreams.getState();
    if (!api) return;

    const resp = await api.categories.idNamePartialUpdate(id.toString(), { name: newName });
    if (!resp.ok) {
      console.error("error");
      return;
    }

    renameCategory(id, newName);
  },

  async delete(id: number) {
    const { setCategories, categories, api } = useDreams.getState();
    if (!api) return;
    const resp = await api.categories.deleteCategories(id.toString());
    if (!resp.ok) return;

    setCategories(categories.filter((c) => c.id != id));
  },

  async changeType(id: number) {
    const { setCategoryType: changeCategoryType, api } = useDreams.getState();
    if (!api) return;

    const invertedType =
      selectCategory(id)?.type == "category"
        ? EntityCategoryType.TypePerson
        : EntityCategoryType.TypeCategory;

    const resp = await api.categories.idTypePartialUpdate(id.toString(), { type: invertedType });
    if (!resp.ok) {
      console.error("error");
      return;
    }
    changeCategoryType(id, invertedType);
  },

  async merge(sourceId: number, targetId: number, newName: string) {
    const { setCategories, api, categories } = useDreams.getState();
    if (!api) return;
    const resp = await api.categories.mergeCreate({
      sourceCategoryId: sourceId,
      targetCategoryId: targetId,
      newName: newName,
    });
    if (!resp.ok) {
      console.error("error");
      return;
    }

    const newCategories = categories
      .map((c) => {
        return c.id == targetId ? { ...c, name: newName } : c;
      })
      .filter((c) => c.id != sourceId);

    setCategories(newCategories);
  },
};
