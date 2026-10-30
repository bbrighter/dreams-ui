import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useState } from "react";

import { Recording } from "@/store/types/recording.types";

import { TranscriptionModal } from "./TranscriptionModal";

type TranscriptionButtonProps = {
  visible: boolean;
  recording: Recording;
  onSave: (text: string) => Promise<void>;
  startTranscription: () => Promise<void>;
  description: string;
};

export const TranscriptionButton = ({
  visible,
  onSave,
  recording,
  startTranscription,
  description,
}: TranscriptionButtonProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const transcriptionLoading = recording?.transcriptionState === "processing" || loading;
  const transcriptionReady =
    recording?.transcriptionState === "completed" && recording.transcription !== "";
  const transcriptionNotYetDone = recording?.transcriptionState === "pending";

  const onClick = async () => {
    if (transcriptionReady) {
      setOpen(true);
    }
    if (transcriptionNotYetDone) {
      setLoading(true);
      try {
        await startTranscription();
        setOpen(true);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Etwas ist schiefgelaufen");
      } finally {
        setLoading(false);
      }
    }
  };

  if (!visible) return null;

  if (error !== null) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <>
      <Button onClick={onClick} loading={transcriptionLoading} variant="contained">
        Transkribieren
      </Button>
      <TranscriptionModal
        open={open}
        onClose={() => setOpen(false)}
        transcription={recording?.transcription ?? ""}
        onSave={onSave}
        description={description}
      />
    </>
  );
};
