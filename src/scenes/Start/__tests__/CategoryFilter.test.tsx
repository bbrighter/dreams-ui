import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CategoryFilter } from "../CategoryFilter/CategoryFilter";
import { getFilter, getFilterOption } from "./selectors";

describe("CategoryFilter component", () => {
  const onFilterChange = vi.fn();
  const renderFilter = (options: Array<{ name: string; id: number; type: string }>) =>
    render(<CategoryFilter options={options} onFilterChange={onFilterChange} />);

  it("Set and unset filter", async () => {
    renderFilter([{ id: 1, name: "Name", type: "category" }]);

    const combobox = getFilter();
    await userEvent.click(combobox);

    const option = getFilterOption("Name");
    await userEvent.click(option);

    expect(onFilterChange).toHaveBeenCalledExactlyOnceWith(1);

    const clearButton = screen.getByRole("button", { name: "Clear" });
    await userEvent.click(clearButton);

    expect(onFilterChange).toHaveBeenCalledTimes(2);
    expect(onFilterChange).toHaveBeenLastCalledWith(null);
  });

  it("Renders types and persons correctly", async () => {
    renderFilter([
      { id: 1, name: "Cat", type: "category" },
      { id: 2, name: "Per", type: "person" },
    ]);

    const combobox = getFilter();
    await userEvent.click(combobox);

    const catTitle = screen.getByText("Kategorie").closest("li")!;
    expect(catTitle).toBeInTheDocument();
    within(catTitle).getByText("Cat");
    const persTitle = screen.getByText("Person").closest("li")!;
    expect(persTitle).toBeInTheDocument();
    within(persTitle).getByText("Per");
  });
});
