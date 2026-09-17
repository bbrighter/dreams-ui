import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";

import { useNavigateHomePage } from "@/hooks/navigate";
import { categoriesService } from "@/services/categories.service";
import { statisticsService } from "@/services/statistics.service";
import { usePersons, useTags } from "@/store/selectors";
import { useDreams } from "@/store/store";

import { Bar, Navigation } from "../Components";
import { NavigateBackButton } from "../Components/NavigateBackButton";
import { MonthlyChart } from "./MonthlyChart/MonthlyChart";
import { useWordCloud } from "./WordCloud/useWordCloud";
import { WordCloud } from "./WordCloud/WordCloud";

export default function Statistics() {
  const [selectedOption, setSelectedOption] = useState(0);
  const navigateBack = useNavigateHomePage();

  useEffect(() => {
    categoriesService.list();
    statisticsService.getStatistics();
    statisticsService.getMonthlyStatistics();
  }, []);

  const options = ["person", "category"];
  const labels = ["Person", "Kategorie"];

  const wordCloudCounts = useWordCloud(options[selectedOption]);
  const statistics = useDreams((state) => state.monthlyStatistics);
  const persons = usePersons();
  const tags = useTags();

  const categories = selectedOption === 0 ? persons : tags;

  return (
    <>
      <Bar
        mainAction={<NavigateBackButton navigateBack={navigateBack} />}
        position="top"
        showAuth
      />
      <Container sx={{ padding: "2rem" }}>
        <Tabs value={selectedOption} onChange={(_e, v) => setSelectedOption(v)}>
          <Tab label="Personen" />
          <Tab label="Kategorien" />
        </Tabs>
        <WordCloud counts={wordCloudCounts} />
        <MonthlyChart
          statistics={statistics}
          categories={categories}
          label={labels[selectedOption]}
        />
        <Navigation activeIndex={1} />
      </Container>
    </>
  );
}
