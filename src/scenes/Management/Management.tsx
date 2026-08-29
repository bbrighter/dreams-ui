import Container from "@mui/material/Container";
import List from "@mui/material/List";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";

import { categoriesService, statisticsService } from "@/store/services";

import { useStatistics } from "../../store/selectors";
import { Navigation } from "../Components";
import ManagementList from "./ManagementList";

export default function Management() {
  const personStatistics = useStatistics("person");
  const tagStatistics = useStatistics("category");

  useEffect(() => {
    statisticsService.getStatistics(0);
    categoriesService.list();
  }, []);

  const [tab, setTab] = useState(0);

  return (
    <Container sx={{ padding: 1 }}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="Kategorien" />
        <Tab label="Personen" />
      </Tabs>
      <List>
        <ManagementList listItems={tab === 0 ? tagStatistics : personStatistics} />
      </List>
      <Navigation activeIndex={2} />
    </Container>
  );
}
