import Container from "@mui/material/Container";
import { MouseEvent, useEffect, useState } from "react";

import { useNavigateHomePage } from "@/hooks/navigate";
import { categoriesService } from "@/services/categories.service";

import { CategoryType } from "../../store/types/categories.types";
import { Bar, Navigation } from "../Components";
import { NavigateBackButton } from "../Components/NavigateBackButton";
import { MonthlyChart, StatisticsToggleOption, Tags } from "./Components";

export default function Statistics() {
  const [selectedOption, setSelectedOption] = useState<CategoryType>("person");
  const onChangeToggleOption = (_: MouseEvent, v: CategoryType) => {
    setSelectedOption(v);
  };
  const navigateBack = useNavigateHomePage();

  useEffect(() => {
    categoriesService.list();
  }, []);

  return (
    <>
      <Bar
        mainAction={<NavigateBackButton navigateBack={navigateBack} />}
        position="top"
        showAuth
      />
      <Container sx={{ padding: "2rem" }}>
        <StatisticsToggleOption value={selectedOption} onChange={onChangeToggleOption} />
        <Tags type={selectedOption} />
        <MonthlyChart type={selectedOption} />
        <Navigation activeIndex={1} />
      </Container>
    </>
  );
}
