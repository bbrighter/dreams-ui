import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EditFooter, FooterProps } from "../Footer/Footer";
import { getRating } from "./selectors";

describe("Footer component", () => {
  const setRating = vi.fn();
  const onSave = vi.fn();
  const navigateNext = vi.fn();
  const navigatePrev = vi.fn();
  const finalize = vi.fn();

  const renderFooter = (props: Partial<FooterProps>) =>
    render(
      <EditFooter
        rating={null}
        setRating={setRating}
        onSave={onSave}
        navigateNext={navigateNext}
        navigatePrev={navigatePrev}
        nextDisabled={false}
        prevDisabled={false}
        isFinalized={false}
        finalize={finalize}
        {...props}
      />,
    );

  describe("Rating", () => {
    it("Rating is null", () => {
      renderFooter({ rating: null });

      const noRating = getRating(null);
      expect(noRating).toBeChecked();
    });

    it("Rating is set", () => {
      renderFooter({ rating: 2 });

      const stars2 = getRating(2);
      expect(stars2).toBeChecked();
    });

    it.skip("Change rating from null", async () => {
      // TODO: make it work
      renderFooter({ rating: null });

      const stars3 = getRating(3);
      await userEvent.click(stars3);
      expect(setRating).toHaveBeenCalledExactlyOnceWith(3);
      expect(onSave).toHaveBeenCalledOnce();
    });
  });
});
