import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";

export const expectPrimaryListItem = (el: HTMLElement) =>
  expect(el).toHaveClass("MuiListItemText-primary");

export const expectSecondaryListItem = (el: HTMLElement) =>
  expect(el).toHaveClass("MuiListItemText-secondary");

export const getConfirmButton = () => screen.getByRole("button", { name: "Bestätigen" });
export const getCancelButton = () => screen.getByRole("button", { name: "Abbrechen" });
export const getRenameButton = () => screen.getByRole("button", { name: "Umbenennen" });
export const getDeleteButton = () => screen.getByRole("button", { name: "Löschen" });
export const getMergeButton = (el?: HTMLElement) =>
  (el ? within(el) : screen).getByRole("button", { name: "Merge" });

export const selectOption = async (option: string) => {
  const select = screen.getByRole("combobox");
  await userEvent.click(select);
  const opt = screen.getByRole("option", { name: new RegExp(option) });
  await userEvent.click(opt);
};
