import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { useEffect, useMemo } from "react"

import { categoriesService, Category, useDreams } from "../../../store"


export const CategoryFilter = () => {
  const categories = useDreams(state => state.categories)
  const setFilteredCat = useDreams(state => state.setDreamCategoryFilter)
  const sortedCategories = useMemo(() => {
    const niceNames = [...categories].map(c => ({ ...c, type: c.type == "category" ? "Kategorie" : "Person" }))
    return niceNames.sort((a,b) => a.type.localeCompare(b.type))
  }, [categories])

  useEffect(() => {
    categoriesService.list()
  }, [])

  return (
    <Autocomplete
      data-testid="filter-dreams-search"
      freeSolo
      options={sortedCategories}
      getOptionLabel={(v: Category) => v.name}
      getOptionKey={(v: Category) => v.id}
      groupBy={(v: Category) => v.type}
      onChange={(_e,v: Category | null) => setFilteredCat(v?.id ?? null)}
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
      )}/>
  )
}
