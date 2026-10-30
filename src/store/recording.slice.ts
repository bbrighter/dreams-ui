import { StateCreator } from "zustand";

import { RecordingSlice, RecordingState, StoreSlice } from "./interface";
import { Recording } from "./types/recording.types";

const createInitialRecording = (): RecordingState => ({ recording: null });

export const createRecordingSlice: StateCreator<
  StoreSlice,
  [["zustand/immer", never]],
  [],
  RecordingSlice
> = (set) => ({
  ...createInitialRecording(),

  resetRecording: () => set(createInitialRecording()),

  setRecording: (rec: Recording) => {
    set((draft: RecordingState) => {
      draft.recording = rec;
    });
  },

  updateRecording: (upd: Partial<Recording>) => {
    set((state: RecordingState) => {
      if (state.recording) {
        Object.assign(state.recording, upd);
      }
    });
  },
});
