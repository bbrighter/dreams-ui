import { Temporal } from "@js-temporal/polyfill";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useMemo, useRef } from "react";

import { Dream } from "@/store/types";

import { DreamItem } from "./DreamItem";

type DreamListProps = {
  dreams: Array<Dream>;
  onClick: (id: number) => void;
  onDelete: (id: number) => Promise<void>;
};

export const DreamList = ({ dreams, onClick, onDelete }: DreamListProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const sortedDreams = useMemo(
    () => [...dreams].sort((a, b) => Temporal.Instant.compare(b.date, a.date)),
    [dreams],
  );

  const SCROLL_POSITION_KEY = "start-scroll-position";

  useEffect(() => {
    const savedPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);

    if (savedPosition !== null && parentRef.current !== null) {
      parentRef.current.scrollTop = Number(savedPosition);
    }

    const handleScroll = () => {
      if (parentRef.current) {
        sessionStorage.setItem(SCROLL_POSITION_KEY, String(parentRef.current.scrollTop));
      }
    };

    const element = parentRef.current;

    element?.addEventListener("scroll", handleScroll);

    return () => {
      element?.removeEventListener("scroll", handleScroll);
    };
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
              <DreamItem onClick={onClick} onDelete={onDelete} {...dream} />
            </Box>
          );
        })}
      </List>
    </Box>
  );
};
