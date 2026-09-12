import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { createCategories } from "@/__tests__/fixtures/categories";
import { createDream, createDreams } from "@/__tests__/fixtures/dreams";
import { getCategoriesHandler } from "@/__tests__/mocks/categoryHandlers";

import { getDreamsHandler } from "../../../__tests__/mocks/dreamsHandlers";
import { server } from "../../../__tests__/setupTest";
import Start from "../Start";
import {
  findRowByDate,
  getAddDreamButton,
  getDeleteButton,
  getFilter,
  getFilterOption,
} from "./selectors";

window.scrollTo = vi.fn();

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

describe("start page is rendered and can be clicked", () => {
  Object.defineProperty(HTMLElement.prototype, "clientHeight", {
    configurable: true,
    value: 500,
  });

  it("everything is rendered", async () => {
    server.use(getDreamsHandler(createDreams({ date: "2025-01-01T12:00:00Z" })));

    render(
      <MemoryRouter>
        <Start />
      </MemoryRouter>,
    );

    const row = await findRowByDate("01.01.2025");

    expect(getDeleteButton(row)).toBeInTheDocument();
    expect(getAddDreamButton()).toBeInTheDocument();
    expect(screen.getByText("Übersicht")).toBeInTheDocument();
    expect(screen.getByText("Auswertung")).toBeInTheDocument();
    expect(screen.getByText("Management")).toBeInTheDocument();
  });

  it("finalized and rating is rendered", async () => {
    server.use(
      getDreamsHandler(
        createDreams([
          createDream({ date: "2025-01-01T12:00:00Z", finalized: false }),
          createDream({ date: "2025-02-01T13:00:00Z", finalized: true, rating: 3 }),
        ]),
      ),
    );
    render(
      <MemoryRouter>
        <Start />
      </MemoryRouter>,
    );

    const nonFinalizedRow = await findRowByDate("01.01.2025");

    const svg = nonFinalizedRow.querySelector("svg") as SVGElement;
    expect(svg.getAttribute("class")).toMatch(/colorWarning/);
    const notRated = within(nonFinalizedRow).getByTitle("Bewertung");
    expect(notRated.getAttribute("aria-label")).toBe("0 Stars");

    const finalizedRow = await findRowByDate("01.02.2025");
    const warnSvg = finalizedRow.querySelector("svg") as SVGElement;
    expect(warnSvg).toBeInTheDocument();
    expect(warnSvg.getAttribute("class")).not.toMatch(/colorWarning/);
    const rated = within(finalizedRow).getByTitle("Bewertung");
    expect(rated.getAttribute("aria-label")).toBe("3 Stars");
  });

  it("deletion works", async () => {
    server.use(getDreamsHandler(createDreams({ date: "2025-01-01T12:00:00Z" })));
    render(
      <MemoryRouter>
        <Start />
      </MemoryRouter>,
    );

    const row = await findRowByDate("01.01.2025");
    const deleteButton = getDeleteButton(row);
    await userEvent.click(deleteButton);

    expect(screen.queryByText("01.01.2025")).toBeNull();
  });

  it("empty list", async () => {
    server.use(getDreamsHandler(createDreams([])));
    render(
      <MemoryRouter>
        <Start />
      </MemoryRouter>,
    );

    expect(getAddDreamButton()).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("filtering by category", async () => {
    server.use(
      getDreamsHandler(
        createDreams([
          createDream({
            categories: [{ id: 1, name: "Category", type: "category" }],
          }),
          createDream({ id: 2 }),
        ]),
      ),
      getCategoriesHandler(createCategories({ name: "Category", id: 1 })),
    );
    render(
      <MemoryRouter>
        <Start />
      </MemoryRouter>,
    );

    const filter = getFilter();
    await userEvent.type(filter, "Category");
    const option = getFilterOption("Category");
    expect(option).toBeInTheDocument();
    await userEvent.click(option);

    expect(screen.queryAllByTestId("dream-icon")).toHaveLength(1);
  });
});
