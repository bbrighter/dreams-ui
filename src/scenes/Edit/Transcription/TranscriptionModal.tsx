import SaveIcon from "@mui/icons-material/Save";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

type TranscriptionModalProps = Omit<DialogProps, "onClose"> & {
  onClose: () => void;
  transcription: string;
  onSave: (text: string) => Promise<void>;
  description: string;
};

export const TranscriptionModal = (props: TranscriptionModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState(props.transcription);

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    setText(props.transcription);
  }, [props.transcription]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await props.onSave(text);
      props.onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} fullScreen>
      <DialogTitle>Transkription</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mt: 2 }}
          label={"Beschreibung"}
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          fullWidth
          maxRows={20}
          multiline
        />
      </DialogContent>

      {props.description !== "" && (
        <Alert severity="warning" sx={{ margin: 2 }}>
          Die aktuelle Beschreibung wird überschrieben!
        </Alert>
      )}
      <DialogActions sx={{ padding: 2 }}>
        <Button
          loading={isLoading}
          onClick={handleSave}
          variant="contained"
          startIcon={<SaveIcon />}
        >
          Speichern
        </Button>
        <Button onClick={props.onClose} variant="outlined">
          Abbrechen
        </Button>
      </DialogActions>
    </Dialog>
  );
};
