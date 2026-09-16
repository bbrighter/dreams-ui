import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { DefaultMode } from "../ManagementList/ListItemModes/DefaultMode";
import { DeleteMode } from "../ManagementList/ListItemModes/DeleteMode";
import { EditMode } from "../ManagementList/ListItemModes/EditMode";
import { MergeMode } from "../ManagementList/ListItemModes/MergeMode";
import { ManagementListItem, ManagementListItemProps } from "../ManagementList/ManagementListItem";
import {
  expectPrimaryListItem,
  expectSecondaryListItem,
  getCancelButton,
  getConfirmButton,
  getDeleteButton,
  getMergeButton,
  getRenameButton,
} from "./helpers";

describe("DefaultMode component", () => {
  const setEditMode = vi.fn();
  const setDeleteMode = vi.fn();
  const setMergeMode = vi.fn();

  const renderDefaultMode = (count: number) =>
    render(
      <DefaultMode
        name="Name"
        count={count}
        setDeleteMode={setDeleteMode}
        setEditMode={setEditMode}
        setMergeMode={setMergeMode}
      />,
    );

  it("Name and count is displayed", () => {
    renderDefaultMode(10);

    const primaryText = screen.getByText("Name");
    expectPrimaryListItem(primaryText);
    const secondaryText = screen.getByText("10");
    expectSecondaryListItem(secondaryText);
  });

  it("Actions work", async () => {
    renderDefaultMode(0);

    const editButton = getRenameButton();
    await userEvent.click(editButton);
    expect(setEditMode).toHaveBeenCalledOnce();

    const deleteButton = getDeleteButton();
    await userEvent.click(deleteButton);
    expect(setDeleteMode).toHaveBeenCalledOnce();

    const mergeButton = getMergeButton();
    await userEvent.click(mergeButton);
    expect(setMergeMode).toHaveBeenCalledOnce();
  });

  it("Delete disabled if count > 0", () => {
    renderDefaultMode(10);

    const deleteButton = getDeleteButton();
    expect(deleteButton).toBeDisabled();
  });
});

describe("DeleteMode component", () => {
  const onDelete = vi.fn();
  const onCancel = vi.fn();
  it("Name is displayed", async () => {
    render(<DeleteMode name="Name" onCancel={onCancel} onDelete={onDelete} />);

    const primaryText = screen.getByText("Wirklich löschen?");
    expectPrimaryListItem(primaryText);
    const secondaryText = screen.getByText("Name");
    expectSecondaryListItem(secondaryText);
  });

  it("Actions work", async () => {
    render(<DeleteMode name="Name" onCancel={onCancel} onDelete={onDelete} />);

    const deleteButton = getConfirmButton();
    await userEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledOnce();

    const cancelButton = getCancelButton();
    await userEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalledOnce();
  });
});

describe("EditMode component", () => {
  const onChange = vi.fn();
  const onConfirm = vi.fn();
  const onCancel = vi.fn();

  const renderEditMode = () =>
    render(<EditMode onCancel={onCancel} name="Name" onChange={onChange} onConfirm={onConfirm} />);

  it("Renders everything", () => {
    renderEditMode();

    expect(screen.getByRole("textbox")).toHaveValue("Name");
    expect(getConfirmButton()).toBeInTheDocument();
    expect(getCancelButton()).toBeInTheDocument();
  });

  it("Confirm and cancel work", async () => {
    renderEditMode();

    const confirmButton = getConfirmButton();
    await userEvent.click(confirmButton);
    expect(onConfirm).toHaveBeenCalledOnce();

    const cancelButton = getCancelButton();
    await userEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("Textfield behaves correctly", async () => {
    renderEditMode();

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("Name");

    await userEvent.type(input, "s");
    expect(onChange).toHaveBeenLastCalledWith("Names");
  });
});

describe("MergeMode component", () => {
  const onChange = vi.fn();
  const onConfirm = vi.fn();
  const onCancel = vi.fn();

  const renderMergeMode = (overrides?: {
    value?: number;
    persons?: Array<{ name: string; id: number }>;
    tags?: Array<{ name: string; id: number }>;
  }) =>
    render(
      <MergeMode
        value={1}
        onCancel={onCancel}
        onChange={onChange}
        onConfirm={onConfirm}
        persons={[{ id: 1, name: "Pers" }]}
        tags={[]}
        {...overrides}
      />,
    );
  it("Renders everything", () => {
    renderMergeMode();

    screen.getByRole("combobox");
    getConfirmButton();
    getCancelButton();
  });

  it("Confirm works", async () => {
    renderMergeMode();

    await userEvent.click(getConfirmButton());
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("Cancel works", async () => {
    renderMergeMode();

    await userEvent.click(getCancelButton());
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("Select a new category", async () => {
    renderMergeMode({
      tags: [
        { id: 1, name: "Name" },
        { id: 2, name: "Different" },
      ],
      persons: [],
    });

    const select = screen.getByRole("combobox");
    await userEvent.click(select);

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(2);

    const differentOption = screen.getByRole("option", { name: /Different/ });
    await userEvent.click(differentOption);
    expect(onChange).toHaveBeenCalledExactlyOnceWith(2);
  });

  it("Select a new person", async () => {
    renderMergeMode({
      persons: [
        { id: 1, name: "Name" },
        { id: 2, name: "Different" },
      ],
    });

    const select = screen.getByRole("combobox");
    await userEvent.click(select);

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(2);

    const differentOption = screen.getByRole("option", { name: /Different/ });
    await userEvent.click(differentOption);
    expect(onChange).toHaveBeenCalledExactlyOnceWith(2);
  });

  it("Persons and categories are displayed", async () => {
    renderMergeMode({
      persons: [{ id: 1, name: "Hubert" }],
      tags: [{ id: 2, name: "Tag" }],
    });

    const select = screen.getByRole("combobox");
    await userEvent.click(select);

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(2);
    screen.getByRole("option", { name: /Hubert/ });
    screen.getByRole("option", { name: /Tag/ });
  });
});

describe("ManagementListItem component", () => {
  const onDelete = vi.fn();
  const onMerge = vi.fn();
  const onRename = vi.fn();

  const renderManagementListItem = (props?: Partial<ManagementListItemProps>) =>
    render(
      <ManagementListItem
        count={0}
        id={1}
        name="Name"
        onDelete={onDelete}
        onMerge={onMerge}
        onRename={onRename}
        persons={[]}
        tags={[]}
        {...props}
      />,
    );

  it("Renders", async () => {
    renderManagementListItem();

    const name = screen.getByText("Name");
    expectPrimaryListItem(name);
    const count = screen.getByText("0");
    expectSecondaryListItem(count);
    getRenameButton();
    getDeleteButton();
    getMergeButton();
  });

  it("Mode changes work", async () => {
    renderManagementListItem({ persons: [{ id: 1, name: "Name" }] });

    const renameButton = getRenameButton();
    await userEvent.click(renameButton);
    const cancelRenameButton = getCancelButton();
    await userEvent.click(cancelRenameButton);

    const deleteButton = getDeleteButton();
    await userEvent.click(deleteButton);
    const cancelDeleteButton = getCancelButton();
    await userEvent.click(cancelDeleteButton);

    const mergeButton = getMergeButton();
    await userEvent.click(mergeButton);
    const cancelMergeButton = getCancelButton();
    await userEvent.click(cancelMergeButton);
  });

  it("Edit works as expected", async () => {
    renderManagementListItem();
    const renameButton = getRenameButton();
    await userEvent.click(renameButton);

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "s");
    const confirmButton = getConfirmButton();
    await userEvent.click(confirmButton);

    expect(onRename).toHaveBeenCalledExactlyOnceWith(1, "Names");
  });

  it("Delete works as expected", async () => {
    renderManagementListItem();
    const deleteButton = getDeleteButton();
    await userEvent.click(deleteButton);

    const confirmButton = getConfirmButton();
    await userEvent.click(confirmButton);

    expect(onDelete).toHaveBeenCalledExactlyOnceWith(1);
  });

  it("Merge works", async () => {
    renderManagementListItem({
      persons: [
        { id: 1, name: "Name" },
        { id: 2, name: "Other name" },
      ],
    });
    const mergeButton = getMergeButton();
    await userEvent.click(mergeButton);

    const select = screen.getByRole("combobox");
    await userEvent.click(select);
    const newOption = screen.getByRole("option", { name: /Other name/ });
    await userEvent.click(newOption);
    const confirmButton = getConfirmButton();
    await userEvent.click(confirmButton);

    expect(onMerge).toHaveBeenCalledExactlyOnceWith(1, 2, "Name");
  });
});
