import { screen, within } from "@testing-library/react";

export const getFilterOption = (option: string) => screen.getByRole("option", { name: option });
export const getFilter = () => screen.getByRole("combobox", { name: "Filtere Kategorien..." });

export const findRowByDate = async (date: string): Promise<HTMLElement> => {
  const relevantRow = (await screen.findByText(date)) as HTMLElement;
  const wrapper = relevantRow.closest("li") as HTMLElement;
  return wrapper;
};

export const getDeleteButton = (row?: HTMLElement) =>
  row ? within(row).getByTitle("Löschen") : screen.getByTitle("Löschen");

export const getAddDreamButton = () => screen.getByRole("button", { name: "Neu" });
