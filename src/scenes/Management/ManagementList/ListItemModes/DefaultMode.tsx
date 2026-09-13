import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";

import { CustomStack } from "./CustomStack";

type DefaultModeProps = {
  name: string;
  count: number;
  setEditMode: () => void;
  setDeleteMode: () => void;
  setMergeMode: () => void;
};

export const DefaultMode = ({
  name,
  count,
  setDeleteMode,
  setEditMode,
  setMergeMode,
}: DefaultModeProps) => {
  const isDeleteDisabled = count > 0;

  return (
    <CustomStack
      left={<ListItemText primary={name} secondary={count} />}
      actions={
        <>
          <IconButton onClick={setEditMode} title="Umbenennen">
            <EditIcon />
          </IconButton>
          <IconButton disabled={isDeleteDisabled} onClick={setDeleteMode} title="Löschen">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={setMergeMode} title="Merge">
            <MergeTypeIcon />
          </IconButton>
        </>
      }
    />
  );
};
