import Container from "@mui/material/Container";
import { useEffect, useState } from "react";

import { categoriesService, CategoryType, useIsLoggedIn } from "../../store";
import { Bar, Navigation } from "../Components";
import { BackButton } from "../Edit/Components/Header/EditHeader";
import { MonthlyChart, StatisticsToggleOption, Tags } from "./Components";

export default function Statistics() {
  const loggedIn = useIsLoggedIn();

  const [selectedOption, setSelectedOption] = useState<CategoryType>("person");
  const onChangeToggleOption = (_, v: CategoryType) => {
    setSelectedOption(v);
  };

  useEffect(() => {
    categoriesService.list();
  }, [loggedIn]);

  return (
    <>
      <Bar mainAction={<BackButton />} position="top" showAuth />
      <Container sx={{ padding: "2rem" }}>
        <StatisticsToggleOption value={selectedOption} onChange={onChangeToggleOption} />
        <Tags type={selectedOption} />
        <MonthlyChart type={selectedOption} />
        <Navigation activeIndex={1} />
      </Container>
    </>
  );
}
