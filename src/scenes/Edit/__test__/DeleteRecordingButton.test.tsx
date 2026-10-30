import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DeleteRecordingButton } from "../DeleteRecordingButton/DeleteRecordingButton";
import { clickDeleteRecordingButton } from "./utils";

describe("DeleteRecordingButton", () => {
  const onDelete = vi.fn();
  it("Renders", async () => {
    render(<DeleteRecordingButton visible={true} onDelete={onDelete} />);

    await clickDeleteRecordingButton();

    expect(onDelete).toHaveBeenCalledOnce();
  });

  it("Invisible", async () => {
    render(<DeleteRecordingButton visible={false} onDelete={onDelete} />);

    await waitFor(() => {
      expect(screen.queryByRole("button")).toBeNull();
    });
  });
});
