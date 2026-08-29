import Box from "@mui/material/Box";
import { useEffect } from "react";
import { TagCloud } from "react-tagcloud";

import { CategoryType, statisticsService, useStatistics } from "../../../store";

export function Tags({ type }: { type: CategoryType }) {
  useEffect(() => {
    statisticsService.getStatistics(40);
  }, []);

  const counts = useStatistics(type);

  const tags = counts.map((s) => ({ key: s.id.toString(), value: s.name, count: s.count }));

  return (
    <Box sx={{ position: "relative", width: "80%", left: "10%", mt: "1rem", mb: "1rem" }}>
      <TagCloud maxSize={50} minSize={10} tags={tags} />
    </Box>
  );
}
