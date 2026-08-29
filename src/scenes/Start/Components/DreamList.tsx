import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";

import { useFilteredDreams } from "../../../store/selectors";
import { dreamsService } from "../../../store/services";
import { DreamItem } from "./DreamItem";

export const DreamList = () => {
  const dreams = useFilteredDreams();

  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dreamsService.getDreams();
  }, []);

  // oxlint-disable-next-line react/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: dreams.length,
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
          const dream = dreams[virtualItem.index];

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
