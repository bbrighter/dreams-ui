import Container from "@mui/material/Container";
import { useEffect } from "react";

import { useDreams } from "../../store/store";
import { Bar, Navigation } from "../Components";
import { AddDreamButton, CategoryFilter, DreamList } from "./Components";

export default function Start() {
  const scrollPosition = useDreams((state) => state.scrollPosition);
  const setScrollPosition = useDreams((state) => state.setScrollPosition);

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Bar mainAction={<AddDreamButton />} position="top" showAuth />
      <Container sx={{ pt: "1rem", pb: "3rem" }}>
        <CategoryFilter />
        <DreamList />
        <Navigation activeIndex={0} />
      </Container>
    </>
  );
}
