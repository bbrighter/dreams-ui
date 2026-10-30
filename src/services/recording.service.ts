import { MIME_TYPE } from "@/constants";
import { useDreams } from "@/store/store";

export const recordingService = {
  getRecording: async (id: number): Promise<Blob> => {
    const { api, updateRecording } = useDreams.getState();
    if (!api) return new Blob();

    const resp = await api.recordings.recordingsDetail(id.toString());
    if (!resp.ok) {
      console.error("error");
      return new Blob();
    }

    const file = await resp.blob();
    const audioFile = new Blob([file], { type: MIME_TYPE });
    updateRecording({ recording: audioFile });
    return audioFile;
  },

  deleteRecording: async (id: number) => {
    const { api, resetRecording, updateDream } = useDreams.getState();
    if (!api) return;

    const resp = await api.recordings.recordingsDelete(id.toString());
    if (!resp.ok) {
      console.error("error");
      return;
    }

    resetRecording();
    updateDream({ recordingId: null });
  },
};
