import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";

import { CustomStack } from "./CustomStack";

type DeleteModeProps = {
  name: string;
  onDelete: () => void;
  onCancel: () => void;
};

export const DeleteMode = ({ name, onCancel, onDelete }: DeleteModeProps) => {
  return (
    <CustomStack
      left={<ListItemText primary="Wirklich löschen?" secondary={name} />}
      actions={
        <>
          <IconButton title="Bestätigen" onClick={onDelete}>
            <DeleteIcon color="success" />
          </IconButton>
          <IconButton title="Abbrechen" onClick={onCancel}>
            <CancelIcon color="error" />
          </IconButton>
        </>
      }
    />
  );
};
