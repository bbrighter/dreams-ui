import { dreamService } from "@/services/dream.service";
import { useDreams } from "@/store/store";

export const useRecordingProps = () => {
  const recordingState = useDreams((state) => state.recording?.recordingState);
  const visible = recordingState !== "stored";
  const postRecording = dreamService.postRecording;

  return { visible, postRecording };
};
