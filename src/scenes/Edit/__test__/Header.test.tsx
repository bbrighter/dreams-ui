import { Temporal } from "@js-temporal/polyfill";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Header, HeaderProps } from "../Header/Header";
import { getSaveButton } from "./selectors";

describe("Header component", () => {
  const onChangeDate = vi.fn();
  const onSave = vi.fn();
  const navigateBack = vi.fn();
  const renderHeader = (props?: Partial<HeaderProps>) =>
    render(
      <Header
        date={Temporal.Instant.from("2026-08-30T10:19:00Z")}
        isSaved
        onChangeDate={onChangeDate}
        onSave={onSave}
        navigateBack={navigateBack}
        {...props}
      />,
    );

  it("Date is rendered and can be changed", async () => {
    renderHeader();

    screen.getByTitle("Datum");
    const input = screen.getByDisplayValue("2026-08-30");
    await userEvent.type(input, "2026-09-30");

    // TODO: Check change
    // expect(onChangeDate).toHaveBeenCalledExactlyOnceWith();
  });

  it("Navigate home button", async () => {
    renderHeader();

    const button = screen.getByRole("button", { name: "Zurück" });
    await userEvent.click(button);

    expect(navigateBack).toHaveBeenCalledOnce();
  });

  describe("Save button", () => {
    it("Is saved", async () => {
      renderHeader({ isSaved: true });

      const button = getSaveButton();
      expect(button).toHaveClass("MuiIconButton-colorSuccess");

      await userEvent.click(button);
      expect(onSave).toHaveBeenCalledOnce();
    });

    it.skip("Is not saved", async () => {
      renderHeader({ isSaved: false });

      const button = getSaveButton();
      expect(button).toHaveClass("MuiIconButton-colorError");

      await userEvent.click(button);
      expect(onSave).toHaveBeenCalledOnce();
    });
  });
});
