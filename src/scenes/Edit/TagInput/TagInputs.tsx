import Autocomplete, { AutocompleteChangeReason } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

type Tag = { id: number; name: string };

export type TagInputProps = {
  label: string;
  options: Array<Tag>;
  values: Array<Tag>;
  onAddNew: (v: string) => void;
  onAddExisting: (id: number) => void;
  onRemove: (id: number) => void;
};

export const TagInputs = ({
  label,
  options,
  values,
  onAddNew,
  onAddExisting,
  onRemove,
}: TagInputProps) => {
  const pickableOptions = options.filter((o) => !values.some((v) => v.id == o.id));
  //   const options = allOptions

  const getValue = (option: Tag | string): string => {
    return typeof option == "string" ? option : option.name;
  };

  const onChange = (
    _: React.SyntheticEvent,
    changeValues: (Tag | string)[],
    changeReason: AutocompleteChangeReason,
  ) => {
    const newValue = changeValues.at(-1);
    if (changeReason === "createOption" && typeof newValue === "string") {
      onAddNew(newValue);
    } else if (
      changeReason === "selectOption" &&
      typeof newValue === "object" &&
      "id" in newValue
    ) {
      onAddExisting(newValue.id);
    } else if (changeReason === "removeOption") {
      const removedValue = values.find((v) => !changeValues.some((c) => c === v));
      if (removedValue) onRemove(removedValue.id);
    }
  };

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
      options={pickableOptions}
      clearOnBlur
      getOptionLabel={getValue}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};
