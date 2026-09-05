import { dreamService } from "@/services/dream.service";
import { useDreamCategories, usePersons, useTags } from "@/store/selectors";

import { TagInputProps } from "./TagInputs";

export const usePersonInput = (): TagInputProps => {
  const label = "Beteiligte Personen";
  const options = usePersons();
  const values = useDreamCategories().persons;
  const onAddExisting = dreamService.addExistingCategory;
  const onAddNew = (name: string) => dreamService.addNewCategory(name, "person");
  const onRemove = dreamService.removeCategory;

  return { label, options, values, onAddExisting, onAddNew, onRemove };
};

export const useCategoryInput = (): TagInputProps => {
  const label = "Kategorien";
  const options = useTags();
  const values = useDreamCategories().categories;
  const onAddExisting = dreamService.addExistingCategory;
  const onAddNew = (name: string) => dreamService.addNewCategory(name, "category");
  const onRemove = dreamService.removeCategory;

  return { label, options, values, onAddExisting, onAddNew, onRemove };
};
