import Container from "@mui/material/Container";
import { useEffect, useMemo, useState } from "react";

import { useNavigateToDream } from "@/hooks/navigate";
import { categoriesService } from "@/services/categories.service";
import { dreamsService } from "@/services/dreams.service";

import { useDreams } from "../../store/store";
import { Bar, Navigation } from "../Components";
import { AddDreamButton } from "./AddDreamButton/AddDreamButton";
import { CategoryFilter } from "./CategoryFilter/CategoryFilter";
import { DreamList } from "./DreamList/DreamList";

export default function Start() {
  const navigate = useNavigateToDream();
  const createDream = dreamsService.postDream;
  const categories = useDreams((state) => state.categories);
  const dreams = useDreams((state) => state.dreams);
  const [filteredCategoryId, setFilteredCategoryId] = useState<number | null>(null);

  const filteredDreams = useMemo(() => {
    if (filteredCategoryId === null) {
      return dreams;
    }
    return dreams.filter((d) => d.categories.includes(filteredCategoryId));
  }, [dreams, filteredCategoryId]);

  useEffect(() => {
    dreamsService.getDreams();
    categoriesService.list();
  }, []);

  return (
    <>
      <Bar
        mainAction={<AddDreamButton navigate={navigate} createDream={createDream} />}
        position="top"
        showAuth
      />
      <Container sx={{ pt: "1rem", pb: "3rem" }}>
        <CategoryFilter options={categories} onFilterChange={setFilteredCategoryId} />
        <DreamList
          dreams={filteredDreams}
          onClick={navigate}
          onDelete={dreamsService.deleteDream}
        />
        <Navigation activeIndex={0} />
      </Container>
    </>
  );
}
