import { Temporal } from "@js-temporal/polyfill";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Dream } from "@/store/types";

import { DreamList } from "../DreamList/DreamList";
import { getDeleteButton } from "./selectors";

vi.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: ({ count }: { count: number }) => ({
    getVirtualItems: () =>
      Array.from({ length: count }, (_, index) => ({
        index,
        key: index,
        start: index * 35,
      })),
    getTotalSize: () => count * 35,
    measureElement: () => {},
  }),
}));

describe("DreamList component", () => {
  const onClick = vi.fn();
  const onDelete = vi.fn();
  const renderDreamList = (dreams: Array<Dream> = []) =>
    render(<DreamList dreams={dreams} onClick={onClick} onDelete={onDelete} />);

  it("Renders dreams in a sorted way", () => {
    renderDreamList([
      {
        id: 1,
        categories: [],
        date: Temporal.Instant.from("2026-09-09T20:17:00Z"),
        description: "",
        finalized: false,
        rating: null,
      },
      {
        id: 1,
        categories: [],
        date: Temporal.Instant.from("2026-09-10T20:17:00Z"),
        description: "",
        finalized: false,
        rating: null,
      },
    ]);

    const rows = screen.getAllByRole("listitem");
    expect(rows).toHaveLength(2);
    const firstEntry = rows[0];
    expect(firstEntry).toHaveTextContent("10.09.2026");
    const secondRow = rows[1];
    expect(secondRow).toHaveTextContent("09.09.2026");
  });

  it("Actions", async () => {
    renderDreamList([
      {
        id: 1,
        categories: [],
        date: Temporal.Instant.from("2026-09-10T12:00:00Z"),
        description: "",
        finalized: false,
        rating: null,
      },
    ]);

    const row = screen.getByRole("listitem");
    await userEvent.click(row);
    expect(onClick).toHaveBeenCalledExactlyOnceWith(1);

    const deleteButton = getDeleteButton(row);
    await userEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledExactlyOnceWith(1);
  });

  it("Rating is shown", () => {
    renderDreamList([
      {
        id: 1,
        categories: [],
        date: Temporal.Instant.from("2026-09-10T12:00:00Z"),
        description: "",
        finalized: false,
        rating: 3,
      },
    ]);

    const rating = screen.getByTitle("Bewertung");
    expect(rating).toHaveAttribute("aria-label", "3 Stars");
  });

  it("Non-finalized is shown", () => {
    renderDreamList([
      {
        id: 1,
        categories: [],
        date: Temporal.Instant.from("2026-09-10T12:00:00Z"),
        description: "",
        finalized: false,
        rating: 3,
      },
    ]);

    const finalized = screen.getByTestId("dream-icon");
    const icon = finalized.querySelector("svg");
    expect(icon).toHaveClass("MuiSvgIcon-colorWarning");
  });

  it("Finalized is shown", () => {
    renderDreamList([
      {
        id: 1,
        categories: [],
        date: Temporal.Instant.from("2026-09-10T12:00:00Z"),
        description: "",
        finalized: true,
        rating: 3,
      },
    ]);

    const finalized = screen.getByTestId("dream-icon");
    const icon = finalized.querySelector("svg");
    expect(icon).not.toHaveClass(/MuiSvgIcon-color/);
  });
});
