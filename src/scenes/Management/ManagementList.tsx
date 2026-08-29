import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack, { StackProps } from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import React from "react";

import { categoriesService } from "@/services/categories.service";

import { usePersons, useTags } from "../../store/selectors";

export default function ManagementList(props: {
  listItems: Array<{ id: number; name: string; count?: number }>;
}) {
  const sortedItems = [...props.listItems].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <List>
      {sortedItems.map((l) => (
        <ManagementListItem key={l.id} listItem={l} />
      ))}
    </List>
  );
}

function ManagementListItem(props: { listItem: { id: number; name: string; count?: number } }) {
  const tags = useTags();
  const persons = usePersons();
  const [mode, setMode] = useState<"default" | "edit" | "delete" | "merge">("default");
  const [name, setName] = useState(props.listItem.name);
  const [mergeValue, setMergeValue] = useState(props.listItem.id);

  const setDefaultMode = () => setMode("default");

  const onConfirmRename = async () => {
    await categoriesService.rename(props.listItem.id, name);
    setDefaultMode();
  };

  const onConfirmDelete = async () => {
    await categoriesService.delete(props.listItem.id);
    setDefaultMode();
  };

  const onConfirmMerge = async () => {
    await categoriesService.merge(props.listItem.id, mergeValue, props.listItem.name);
    setDefaultMode();
  };

  const count = props.listItem.count ?? 0;

  return (
    <ListItem>
      {mode == "default" && (
        <CustomStack>
          <ListItemText primary={props.listItem.name} secondary={count} />
          <IconButton onClick={() => setMode("edit")} title="Umbenennen">
            <EditIcon />
          </IconButton>
          <IconButton disabled={count > 0} onClick={() => setMode("delete")} title="Löschen">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => setMode("merge")} title="Merge">
            <MergeTypeIcon />
          </IconButton>
        </CustomStack>
      )}
      {mode == "edit" && (
        <CustomStack>
          <TextField value={name} onChange={(e) => setName(e.target.value)}></TextField>
          <IconButton title="Bestätigen" onClick={onConfirmRename}>
            <EditIcon color="success" />
          </IconButton>
          <IconButton title="Abbrechen" onClick={setDefaultMode}>
            <CancelIcon color="error" />
          </IconButton>
        </CustomStack>
      )}
      {mode == "delete" && (
        <CustomStack>
          <ListItemText primary="Wirklich löschen?" secondary={props.listItem.name} />
          <IconButton title="Bestätigen" onClick={onConfirmDelete}>
            <DeleteIcon color="success" />
          </IconButton>
          <IconButton title="Abbrechen" onClick={setDefaultMode}>
            <CancelIcon color="error" />
          </IconButton>
        </CustomStack>
      )}
      {mode == "merge" && (
        <CustomStack>
          <Select
            value={mergeValue}
            onChange={(e) => setMergeValue(e.target.value)}
            variant="standard"
            size="small"
            sx={{ minHeight: 0, "& .MuiSelect-select": { py: 0 } }}
          >
            {tags.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                <ListItemText primary={c.name} secondary="Kategorie" />
              </MenuItem>
            ))}
            {persons.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                <ListItemText primary={p.name} secondary="Person" />
              </MenuItem>
            ))}
          </Select>
          <IconButton title="Bestätigen" onClick={onConfirmMerge}>
            <MergeTypeIcon color="success" />
          </IconButton>
          <IconButton title="Abbrechen" onClick={setDefaultMode}>
            <CancelIcon color="error" />
          </IconButton>
        </CustomStack>
      )}
    </ListItem>
  );
}

type CustomStackProps = {
  spacing?: number;
} & StackProps;

const CustomStack: React.FC<React.PropsWithChildren<CustomStackProps>> = ({
  children,
  spacing = 1,
  ...stackProps
}) => {
  const childrenArray = React.Children.toArray(children);
  const [left, ...right] = childrenArray;
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: "100%" }}
      {...stackProps}
    >
      {left}
      <Stack direction="row" spacing={spacing}>
        {right}
      </Stack>
    </Stack>
  );
};
