import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";

export const getRowByText = (text: string): HTMLElement => {
  const element = screen.getByText(text);
  return element.closest("li")!;
};

export const clickEditButton = async (text: string) => {
  await waitFor(async () => {
    const row = getRowByText(text);
    const editButton = within(row).getByTitle("Umbenennen");
    await userEvent.click(editButton);
  });
};

export const findDeleteButton = async (text: string) => {
  const element = await screen.findByText(text);
  const row = element.closest("li")!;
  expect(row).toBeInTheDocument();
  return within(row).getByTitle("Löschen");
};
