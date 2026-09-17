import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { getCategoriesHandler } from "@/__tests__/mocks/categoryHandlers";
import {
  getCountCategoriesHandler,
  getCountCategoriesMonthlyHandler,
} from "@/__tests__/mocks/statisticsHandler";
import { server } from "@/__tests__/setupTest";

import Statistics from "../Statistics";
import * as useWordCloudModule from "../WordCloud/useWordCloud";

vi.spyOn(useWordCloudModule, "useWordCloud");

describe("Statistics integration test", () => {
  const person1 = { id: 1, name: "John", type: "person" };
  const cat2 = { id: 2, name: "Cat", type: "category" };

  it("Everything is rendered", async () => {
    server.use(
      getCategoriesHandler({ categories: [] }),
      getCountCategoriesHandler({ categories: [] }),
      getCountCategoriesMonthlyHandler({ statistics: [] }),
    );

    const { container } = render(
      <MemoryRouter>
        <Statistics />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole("tab")).toHaveLength(2);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(container.querySelector(".tag-cloud")).toBeInTheDocument();
    expect(container.querySelector(".MuiChartsSurface-root")).toBeInTheDocument();
    expect(container.querySelector(".MuiBottomNavigation-root")).toBeInTheDocument();
  });

  it("Switching tabs works", async () => {
    server.use(
      getCategoriesHandler({ categories: [person1, cat2] }),
      getCountCategoriesHandler({
        categories: [
          { ...person1, count: 5 },
          { ...cat2, count: 7 },
        ],
      }),
      getCountCategoriesMonthlyHandler({
        statistics: [
          {
            month: "01",
            dreamCount: 5,
            categories: [
              { categoryId: 1, count: 2 },
              { categoryId: 2, count: 3 },
            ],
          },
          {
            month: "02",
            dreamCount: 7,
            categories: [
              { categoryId: 1, count: 3 },
              { categoryId: 2, count: 4 },
            ],
          },
        ],
      }),
    );

    render(
      <MemoryRouter>
        <Statistics />
      </MemoryRouter>,
    );

    const personTab = screen.getByRole("tab", { name: "Personen" });
    expect(personTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Person")).toBeInTheDocument();
    expect(useWordCloudModule.useWordCloud).toHaveBeenCalledExactlyOnceWith("person");

    const categoryTab = screen.getByRole("tab", { name: "Kategorien" });
    expect(categoryTab).toHaveAttribute("aria-selected", "false");
    await userEvent.click(categoryTab);
    expect(categoryTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Kategorie")).toBeInTheDocument();
    expect(useWordCloudModule.useWordCloud).toHaveBeenLastCalledWith("category");
  });
});
