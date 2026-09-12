import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AddDreamButton } from "../AddDreamButton/AddDreamButton";
import { getAddDreamButton } from "./selectors";

describe("AddDreamButton", () => {
  const navigate = vi.fn();
  const createDream = vi.fn();

  it("On click", async () => {
    const newDreamId = 1;
    createDream.mockResolvedValue(newDreamId);

    render(<AddDreamButton createDream={createDream} navigate={navigate} />);

    const addButton = getAddDreamButton();
    await userEvent.click(addButton);

    expect(createDream).toHaveBeenCalledOnce();
    expect(navigate).toHaveBeenCalledExactlyOnceWith(newDreamId);
  });
});
