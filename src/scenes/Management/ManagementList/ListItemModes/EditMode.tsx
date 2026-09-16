import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import { CustomStack } from "./CustomStack";

type EditModeProps = {
  name: string;
  onChange: (v: string) => void;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
};

export const EditMode = ({ name, onCancel, onConfirm, onChange }: EditModeProps) => {
  return (
    <CustomStack
      left={<TextField value={name} onChange={(e) => onChange(e.target.value)}></TextField>}
      actions={
        <>
          {" "}
          <IconButton title="Bestätigen" onClick={onConfirm}>
            <EditIcon color="success" />
          </IconButton>
          <IconButton title="Abbrechen" onClick={onCancel}>
            <CancelIcon color="error" />
          </IconButton>
        </>
      }
    />
  );
};
