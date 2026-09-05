import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";

export type SaveButtonProps = {
  onSave: () => Promise<void>;
  isSaved: boolean;
};

export const SaveButton = ({ onSave, isSaved }: SaveButtonProps) => (
  <IconButton color={isSaved ? "success" : "error"} onClick={onSave} title="Speichern">
    <SaveIcon />
  </IconButton>
);
