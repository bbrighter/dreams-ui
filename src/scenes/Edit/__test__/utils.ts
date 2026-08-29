import { screen, within } from "@testing-library/react";

export const getSaveButton = (): HTMLElement => {
  const header = getHeaderBar();
  return within(header).getByTitle("Speichern")!;
};

export const getDescriptionInput = (): HTMLElement => {
  return screen.getByLabelText("Beschreibung");
};

export const getPersonInput = (): HTMLElement => {
  return screen.getByLabelText("Beteiligte Personen");
};

export const getCategoryInput = (): HTMLElement => {
  return screen.getByLabelText("Kategorien");
};

export const getStarButton = (stars: number): HTMLElement => {
  const ratingBar = screen.getByTitle("Bewertung");
  const labelText = stars == 1 ? "1 Star" : `${stars} Stars`;
  return within(ratingBar).getByLabelText(labelText)!;
};

export const getFinalizeButton = (): HTMLElement => {
  return screen.getByText("Redigieren");
};

export const getHeaderBar = (): HTMLElement => {
  return screen.getByTestId("app-bar-top");
};
