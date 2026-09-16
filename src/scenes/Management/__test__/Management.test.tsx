import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { createCategories } from "@/__tests__/fixtures/categories";
import { createCategoriesCount } from "@/__tests__/fixtures/statistics";
import { getCountCategoriesHandler } from "@/__tests__/mocks/statisticsHandler";

import { getCategoriesHandler } from "../../../__tests__/mocks/categoryHandlers";
import { server } from "../../../__tests__/setupTest";
import Management from "../Management";
import {
  getConfirmButton,
  getDeleteButton,
  getMergeButton,
  getRenameButton,
  selectOption,
} from "./helpers";

describe("Management is rendered", () => {
  const cat = { id: 1, name: "Category", type: "category" };
  const person = { id: 2, name: "Person", type: "person" };

  it("Tabs work and content is rendered", async () => {
    server.use(
      getCategoriesHandler(createCategories([cat, person])),
      getCountCategoriesHandler(
        createCategoriesCount([
          { ...cat, count: 10 },
          { ...person, count: 3 },
        ]),
      ),
    );
    render(
      <MemoryRouter>
        <Management />
      </MemoryRouter>,
    );

    const categoryRow = (await screen.findByText("Category")).closest("li")!;
    expect(within(categoryRow).getByText(10)).toBeInTheDocument();
    expect(screen.queryAllByText("Person")).toHaveLength(0);

    const personTab = screen.getByRole("tab", { name: "Personen" });
    await userEvent.click(personTab);

    const personRow = screen.getByText("Person").closest("li")!;
    expect(within(personRow).getByText(3)).toBeInTheDocument();
    expect(screen.queryAllByAltText("Category")).toHaveLength(0);

    const categoryTab = screen.getByRole("tab", { name: "Kategorien" });
    await userEvent.click(categoryTab);
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.queryAllByText("Person")).toHaveLength(0);
  });

  it("renaming works", async () => {
    server.use(getCategoriesHandler(createCategories([cat])));
    render(
      <MemoryRouter>
        <Management />
      </MemoryRouter>,
    );

    const renameButton = await waitFor(() => getRenameButton());
    await userEvent.click(renameButton);

    const input = screen.getByDisplayValue("Category");
    await userEvent.clear(input);
    await userEvent.type(input, "New category");
    const saveButton = screen.getByTitle("Bestätigen");
    await userEvent.click(saveButton);
    expect(screen.getByText("New category")).toBeInTheDocument();
  });

  it("Merging works", async () => {
    const cat2 = { id: 20, name: "Other category", type: "category" };
    server.use(
      getCategoriesHandler(createCategories([cat, cat2])),
      getCountCategoriesHandler(
        createCategoriesCount([
          { ...cat, count: 10 },
          { ...cat2, count: 5 },
        ]),
      ),
    );
    render(
      <MemoryRouter>
        <Management />
      </MemoryRouter>,
    );

    const row = (await screen.findByText("Category")).closest("li")!;
    const mergeButton = getMergeButton(row);
    await userEvent.click(mergeButton);

    await selectOption("Other category");

    const confirmButton = getConfirmButton();
    await userEvent.click(confirmButton);

    const rows = screen.getAllByRole("listitem");
    expect(rows).toHaveLength(1);
    expect(screen.queryByText("Other category")).toBeNull();
    screen.getByText("Category");
    screen.getByText("15");
  });

  it("Deleting works", async () => {
    server.use(
      getCategoriesHandler(createCategories([cat])),
      getCountCategoriesHandler(createCategoriesCount([{ ...cat, count: 0 }])),
    );

    render(
      <MemoryRouter>
        <Management />
      </MemoryRouter>,
    );

    const deleteButton = await waitFor(() => getDeleteButton());
    await userEvent.click(deleteButton);
    const confirmButton = getConfirmButton();
    await userEvent.click(confirmButton);

    const entries = screen.queryAllByRole("listitem");
    expect(entries).toHaveLength(0);
  });
});
