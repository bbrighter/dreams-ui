import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useMemo } from "react";

import { categoriesService } from "@/store/services";
import { useDreams } from "@/store/store";

export const CategoryFilter = () => {
  const categories = useDreams((state) => state.categories);
  const setFilteredCat = useDreams((state) => state.setDreamCategoryFilter);
  const sortedCategories = useMemo(() => {
    const niceNames = [...categories].map((c) => ({
      ...c,
      displayType: c.type == "category" ? "Kategorie" : "Person",
    }));
    return niceNames.sort((a, b) => a.displayType.localeCompare(b.displayType));
  }, [categories]);

  useEffect(() => {
    categoriesService.list();
  }, []);

  return (
    <Autocomplete
      data-testid="filter-dreams-search"
      options={sortedCategories}
      getOptionLabel={(v) => v.name}
      getOptionKey={(v) => v.id}
      groupBy={(v) => v.displayType}
      onChange={(_e, v) => setFilteredCat(v?.id ?? null)}
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
