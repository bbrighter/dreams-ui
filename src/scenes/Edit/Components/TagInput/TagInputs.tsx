import Autocomplete, { AutocompleteChangeReason } from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

import { dreamService } from "@/store/services";
import { Category, CategoryType } from "@/store/types/categories.types";

import { useDreamCategories, usePersons, useTags } from "../../../../store/selectors";

export function TagInputs({ type }: { type: CategoryType }) {
  const { addExistingCategory, addNewCategory, removeCategory } = dreamService;
  const { categories, persons } = useDreamCategories();
  const tagValues = useTags();
  const personValues = usePersons();
  const values = type == "category" ? categories : persons;
  const allOptions = type == "category" ? tagValues : personValues;
  const options = allOptions.filter((o) => !values.some((v) => v.id == o.id));
  //   const options = allOptions

  const getValue = (option: Category | string): string => {
    return typeof option == "string" ? option : option.name;
  };

  const onChange = (
    _: React.SyntheticEvent,
    values: (Category | string)[],
    changeReason: AutocompleteChangeReason,
  ) => {
    const newValue = values.at(-1);
    if (!newValue) return;
    if (changeReason == "createOption" && typeof newValue == "string") {
      addNewCategory(newValue, type);
    } else if (changeReason == "selectOption" && typeof newValue != "string") {
      addExistingCategory(newValue.id);
    } else {
      alert("Invalid handleChange:" + changeReason + newValue);
    }
  };

  const onDelete = (id: number) => {
    removeCategory(id);
  };

  const inputLabel = type == "person" ? "Beteiligte Personen" : "Kategorien";
  return (
    <Autocomplete
      sx={{
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
      disablePortal
      value={values}
      onChange={onChange}
      freeSolo
      multiple
      disableClearable
      options={options}
      clearOnBlur
      getOptionLabel={getValue}
      renderTags={(value: Category[]) =>
        value.map((option) => (
          <Chip
            key={option?.id}
            variant="outlined"
            label={option?.name}
            onDelete={() => onDelete(option.id)}
          />
        ))
      }
      renderInput={(params) => <TextField {...params} label={inputLabel} />}
    />
  );
}
