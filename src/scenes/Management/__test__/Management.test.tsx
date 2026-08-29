import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { createCategories } from "@/__tests__/fixtures/categories";
import { createCategoriesCount } from "@/__tests__/fixtures/statistics";
import { getCountCategoriesHandler } from "@/__tests__/mocks/statisticsHandler";

import { getCategoriesHandler } from "../../../__tests__/mocks/categoryHandlers";
import { server } from "../../../__tests__/setupTest";
import { EntityCategoryType } from "../../../api/generated_api";
import Management from "../Management";
import { clickEditButton, findDeleteButton, getRowByText } from "./utils";

describe("Management is rendered", () => {
  const cat = { id: 1, name: "Category", type: EntityCategoryType.TypeCategory };
  const person = { id: 2, name: "Person", type: EntityCategoryType.TypePerson };

  it("Tabs work and content is rendered", async () => {
    server.use(
      getCategoriesHandler(createCategories([cat, person])),
      getCountCategoriesHandler(
        createCategoriesCount([
          { id: 1, count: 10 },
          { id: 2, count: 3 },
        ]),
      ),
    );
    render(
      <MemoryRouter>
        <Management />
      </MemoryRouter>,
    );

    const categoryTab = await screen.findByText("Kategorien");
    const personTab = screen.getByText("Personen");

    const categoryRow = getRowByText("Category");
    expect(within(categoryRow).getByText(10)).toBeInTheDocument();
    expect(screen.queryAllByText("Person")).toHaveLength(0);

    await userEvent.click(personTab);

    const personRow = getRowByText("Person");
    expect(within(personRow).getByText(3)).toBeInTheDocument();
    expect(screen.queryAllByAltText("Category")).toHaveLength(0);

    await userEvent.click(categoryTab);
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.queryAllByText("Person")).toHaveLength(0);
  });

  it("renaming works", async () => {
    server.use(getCategoriesHandler(createCategories([cat, person])));
    render(
      <MemoryRouter>
        <Management />
      </MemoryRouter>,
    );

    await clickEditButton("Category");

    expect(screen.queryByTitle("Bearbeiten")).not.toBeInTheDocument();
    const cancelButton = screen.getByTitle("Abbrechen");

    await userEvent.click(cancelButton);
    await clickEditButton("Category");
    const input = screen.getByDisplayValue("Category");
    await userEvent.clear(input);
    await userEvent.type(input, "New category");
    const saveButton = screen.getByTitle("Bestätigen");
    await userEvent.click(saveButton);
    expect(screen.getByText("New category")).toBeInTheDocument();
  });

  it("deleting is disabled", async () => {
    server.use(
      getCategoriesHandler(
        createCategories([
          cat,
          { id: 2, name: "Category 2", type: EntityCategoryType.TypeCategory },
        ]),
      ),
      getCountCategoriesHandler(
        createCategoriesCount([
          { id: 1, count: 0 },
          { id: 2, count: 10 },
        ]),
      ),
    );
    render(
      <MemoryRouter>
        <Management />
      </MemoryRouter>,
    );

    const disabledDeleteButton = await findDeleteButton("Category 2");
    expect(disabledDeleteButton).toBeDisabled();

    const deleteButton = await findDeleteButton("Category");
    await userEvent.click(deleteButton);

    expect(screen.getByTitle("Abbrechen")).toBeInTheDocument();
    const confirmButton = screen.getByTitle("Bestätigen");
    await userEvent.click(confirmButton);

    expect(screen.queryByText("Category")).not.toBeInTheDocument();
  });

  it("merging works", { skip: true }, async () => {
    render(
      <MemoryRouter>
        <Management />
      </MemoryRouter>,
    );

    const mergeButton = await screen.findByTitle("Merge");
    await userEvent.click(mergeButton);

    expect(screen.getByTitle("Abbrechen")).toBeInTheDocument();
    const confirmButton = screen.getByTitle("Bestätigen");
    await userEvent.click(confirmButton);
    // TODO: Select and merge
  });
});
