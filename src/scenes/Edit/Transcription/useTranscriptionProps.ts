import { dreamService } from "@/services/dream.service";
import { useDreamWithRecording } from "@/store/selectors";

export const useTranscriptionProps = () => {
  const { recording, dream } = useDreamWithRecording();
  const onSave = dreamService.updateDescription;
  const startTranscription = dreamService.startTranscription;
  const visible = recording?.recordingState === "stored"; // && recording.transcriptionState === "pending";
  const description = dream.description;

  return { recording, onSave, startTranscription, visible, description };
};
