import { dreamService } from "@/services/dream.service";
import { useDreamCategories, usePersons, useTags } from "@/store/selectors";

import { TagInputProps } from "./TagInputs";

const onAddNewCategory = (name: string) => dreamService.addNewCategory(name, "category");
const onAddNewPerson = (name: string) => dreamService.addNewCategory(name, "person");

export const usePersonInput = (): TagInputProps => {
  const label = "Beteiligte Personen";
  const options = usePersons();
  const values = useDreamCategories().persons;
  const onAddExisting = dreamService.addExistingCategory;
  const onRemove = dreamService.removeCategory;

  return { label, options, values, onAddExisting, onAddNew: onAddNewPerson, onRemove };
};

export const useCategoryInput = (): TagInputProps => {
  const label = "Kategorien";
  const options = useTags();
  const values = useDreamCategories().categories;
  const onAddExisting = dreamService.addExistingCategory;
  const onRemove = dreamService.removeCategory;

  return { label, options, values, onAddExisting, onAddNew: onAddNewCategory, onRemove };
};
