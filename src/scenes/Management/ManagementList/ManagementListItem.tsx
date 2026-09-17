import ListItem from "@mui/material/ListItem";
import { useState } from "react";

import { DefaultMode } from "./ListItemModes/DefaultMode";
import { DeleteMode } from "./ListItemModes/DeleteMode";
import { EditMode } from "./ListItemModes/EditMode";
import { MergeMode } from "./ListItemModes/MergeMode";

export type ManagementListItemProps = {
  id: number;
  name: string;
  count: number;
  tags: Array<{ id: number; name: string }>;
  persons: Array<{ id: number; name: string }>;
  onRename: (id: number, name: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onMerge: (id: number, newId: number, newName: string) => Promise<void>;
};

export const ManagementListItem = ({
  id,
  name,
  count,
  persons,
  tags,
  onRename,
  onDelete,
  onMerge,
}: ManagementListItemProps) => {
  const [mode, setMode] = useState<"default" | "edit" | "merge" | "delete">("default");
  const setDefaultMode = () => setMode("default");
  const setEditMode = () => setMode("edit");
  const setMergeMode = () => setMode("merge");
  const setDeleteMode = () => setMode("delete");

  const [editName, setEditName] = useState(name);
  const [mergeValue, setMergeValue] = useState(id);

  const saveEditChange = async () => {
    onRename(id, editName);
    setDefaultMode();
  };

  const saveDelete = async () => {
    onDelete(id);
    setDefaultMode();
  };

  const saveMerge = async () => {
    onMerge(id, mergeValue, name);
    setDefaultMode();
  };

  return (
    <ListItem>
      {mode === "default" && (
        <DefaultMode
          count={count}
          name={name}
          setDeleteMode={setDeleteMode}
          setEditMode={setEditMode}
          setMergeMode={setMergeMode}
        />
      )}
      {mode === "edit" && (
        <EditMode
          name={editName}
          onCancel={setDefaultMode}
          onChange={setEditName}
          onConfirm={saveEditChange}
        />
      )}
      {mode === "delete" && (
        <DeleteMode name={name} onCancel={setDefaultMode} onDelete={saveDelete} />
      )}
      {mode === "merge" && (
        <MergeMode
          value={mergeValue}
          persons={persons}
          tags={tags}
          onCancel={setDefaultMode}
          onChange={setMergeValue}
          onConfirm={saveMerge}
        />
      )}
    </ListItem>
  );
};
