import { recordingService } from "@/services/recording.service";
import { useDreams } from "@/store/store";

export const useDeleteRecordingButtonProps = () => {
  const recordingState = useDreams((state) => state.recording?.recordingState);
  const recordingId = useDreams((state) => state.recording?.id);
  const visible = recordingState === "stored" && recordingId !== undefined;
  const onDelete = () => recordingService.deleteRecording(recordingId!);

  return { visible, onDelete };
};
