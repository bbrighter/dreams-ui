import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useMemo } from "react";

type CategoryFilterProps = {
  options: Array<{ name: string; id: number; type: string }>;
  onFilterChange: (catId: number | null) => void;
};

export const CategoryFilter = ({ options, onFilterChange }: CategoryFilterProps) => {
  const sortedCategories = useMemo(() => {
    const niceNames = [...options].map((c) => ({
      ...c,
      displayType: c.type == "category" ? "Kategorie" : "Person",
    }));
    return niceNames.sort((a, b) => a.displayType.localeCompare(b.displayType));
  }, [options]);

  return (
    <Autocomplete
      data-testid="filter-dreams-search"
      options={sortedCategories}
      getOptionLabel={(v) => v.name}
      getOptionKey={(v) => v.id}
      groupBy={(v) => v.displayType}
      onChange={(_e, v) => onFilterChange(v?.id ?? null)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Filtere Kategorien..."
          slotProps={{
            input: {
              ...params.InputProps,
              type: "search",
            },
          }}
        />
      )}
    />
  );
};
