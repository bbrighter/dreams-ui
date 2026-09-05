import { screen } from "@testing-library/react";

export const getSaveButton = () => screen.getByRole("button", { name: "Speichern" });

export const getRating = (rating: number | null) => {
  const name = rating === null ? "Empty" : rating === 1 ? "1 Star" : `${rating} Stars`;
  return screen.getByRole("radio", { name });
};
