import CancelIcon from "@mui/icons-material/Close";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { CustomStack } from "./CustomStack";

type MergeModeProps = {
  value: number;
  onChange: (v: number) => void;
  tags: Array<{ id: number; name: string }>;
  persons: Array<{ id: number; name: string }>;
  onConfirm: () => void;
  onCancel: () => void;
};

export const MergeMode = ({
  value,
  onChange,
  tags,
  persons,
  onConfirm,
  onCancel,
}: MergeModeProps) => {
  return (
    <CustomStack
      left={
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
      }
      actions={
        <>
          {" "}
          <IconButton title="Bestätigen" onClick={onConfirm}>
            <MergeTypeIcon color="success" />
          </IconButton>
          <IconButton title="Abbrechen" onClick={onCancel}>
            <CancelIcon color="error" />
          </IconButton>
        </>
      }
    />
  );
};
