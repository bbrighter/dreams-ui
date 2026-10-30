import { recordingService } from "@/services/recording.service";
import { useDreams } from "@/store/store";

export const useReplayButtonProps = () => {
  const recording = useDreams((state) => state.recording);

  const visible = recording?.recordingState === "stored";
  const recordingId = recording?.id;
  const getRecording = recordingService.getRecording;
  const audioFile = recording?.recording;

  return { visible, recordingId, getRecording, audioFile };
};
