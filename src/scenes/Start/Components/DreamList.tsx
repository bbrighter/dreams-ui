import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useMemo, useRef } from "react";

import { dreamsService } from "@/services/dreams.service";

import { useFilteredDreams } from "../../../store/selectors";
import { DreamItem } from "./DreamItem";

export const DreamList = () => {
  const dreams = useFilteredDreams();
  const sortedDreams = useMemo(
    () => [...dreams].sort((a, b) => b.date.since(a.date).milliseconds),
    [dreams],
  );

  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dreamsService.getDreams();
  }, []);

  // oxlint-disable-next-line react/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: sortedDreams.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <Box
      ref={parentRef}
      sx={{
        height: "calc(100vh - 64px - 56px - 64px)",
        overflow: "auto",
      }}
    >
      <List
        style={{
          height: rowVirtualizer.getTotalSize(),
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const dream = sortedDreams[virtualItem.index];

          return (
            <Box
              key={virtualItem.key}
              ref={rowVirtualizer.measureElement}
              data-index={virtualItem.index}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <DreamItem dream={dream} />
            </Box>
          );
        })}
      </List>
    </Box>
  );
};
