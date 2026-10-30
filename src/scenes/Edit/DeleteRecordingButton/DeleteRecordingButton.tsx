import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
type DeleteRecordingButtonProps = {
  visible: boolean;
  onDelete: () => Promise<void>;
};

export const DeleteRecordingButton = ({ visible, onDelete }: DeleteRecordingButtonProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  if (!visible) return null;

  return (
    <Button
      variant="outlined"
      onClick={onDelete}
      color="error"
      startIcon={isMobile ? <></> : <DeleteIcon />}
    >
      Aufnahme löschen
    </Button>
  );
};
