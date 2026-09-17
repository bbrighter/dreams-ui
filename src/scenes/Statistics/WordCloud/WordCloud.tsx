import Box from "@mui/material/Box";
import { useMemo } from "react";
import { TagCloud } from "react-tagcloud";

type WordCloudProps = {
  counts: Array<{ id: number; name: string; count: number }>;
  limit?: number;
};

export const WordCloud = ({ counts }: WordCloudProps) => {
  const tags = useMemo(
    () => counts.map((s) => ({ key: s.id.toString(), value: s.name, count: s.count })),
    [counts],
  );

  return (
    <Box sx={{ position: "relative", width: "80%", left: "10%", mt: "1rem", mb: "1rem" }}>
      <TagCloud maxSize={50} minSize={10} tags={tags} />
    </Box>
  );
};
