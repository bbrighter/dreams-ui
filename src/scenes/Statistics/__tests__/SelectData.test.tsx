import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import SelectData from "../MonthlyChart/SelectData";

describe("SelectData", () => {
  const onChange = vi.fn();

  it("Nothing selected, two options", async () => {
    render(
      <SelectData
        onChange={onChange}
        options={[
          { id: 1, name: "Name" },
          { id: 2, name: "Other" },
        ]}
        value={0}
      />,
    );

    screen.getByText("Alle");
    const select = screen.getByRole("combobox");
    await userEvent.click(select);

    const menuItems = screen.getAllByRole("option");
    expect(menuItems).toHaveLength(3);
    screen.getByRole("option", { name: "Alle" });
    screen.getByRole("option", { name: "Name" });
    screen.getByRole("option", { name: "Other" });
  });

  it("Select option", async () => {
    render(<SelectData onChange={onChange} options={[{ id: 1, name: "Name" }]} value={0} />);

    const select = screen.getByRole("combobox");
    await userEvent.click(select);

    const option = screen.getByRole("option", { name: "Name" });
    await userEvent.click(option);

    expect(onChange).toHaveBeenCalledExactlyOnceWith(1);
  });

  it("Options are sorted alphabetically", async () => {
    render(
      <SelectData
        onChange={onChange}
        options={[
          { id: 1, name: "B" },
          { id: 2, name: "  A  " },
          { id: 3, name: "zzz" },
        ]}
        value={0}
      />,
    );

    const select = screen.getByRole("combobox");
    await userEvent.click(select);
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);
    expect(options[0]).toHaveAttribute("data-value", "0");
    expect(options[1]).toHaveAttribute("data-value", "2");
    expect(options[2]).toHaveAttribute("data-value", "1");
    expect(options[3]).toHaveAttribute("data-value", "3");
  });
});
