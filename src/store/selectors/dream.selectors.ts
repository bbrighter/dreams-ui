import { useMemo } from "react";

import { Categories } from "../categories";
import { useDreams } from "../store";
import { hashDream } from "../types";

export const dreamIdStr = (): string => {
  const { dream } = useDreams.getState();
  return dream.id.toString();
};

export const useIsSaved = (): boolean => {
  const dream = useDreams((state) => state.dream);
  const hash = useDreams((state) => state.hash);
  return hash == hashDream(dream);
};

export const useDreamCategories = (): { categories: Categories; persons: Categories } => {
  const dreamCategories = useDreams((state) => state.dream.categories);
  const categories = useDreams((state) => state.categories);
  return useMemo(() => {
    return dreamCategories.reduce(
      (prev, curr) => {
        const cat = categories.find((c) => c.id == curr);
        if (!cat) {
          return { categories: prev.categories, persons: prev.persons };
        }
        if (cat.type == "person") {
          return { categories: prev.categories, persons: [...prev.persons, cat] };
        } else {
          return { categories: [...prev.categories, cat], persons: prev.persons };
        }
      },
      { categories: [] as Categories, persons: [] as Categories },
    );
  }, [categories, dreamCategories]);
};
