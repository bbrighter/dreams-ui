import {
  ControllerRecordingResponse,
  EntitiesRecordingState,
  EntitiesTranscriptionState,
} from "@/api/generated_api";

export type Recording = {
  id: number;
  recordingState: RecordingState;
  transcriptionState: TranscriptionState;
  transcription: string;
  recording: Blob;
} | null;

export type RecordingState = "creating" | "stored";

export type TranscriptionState = "pending" | "processing" | "completed" | "failed";

const toTranscriptionState = (state: EntitiesTranscriptionState): TranscriptionState => {
  switch (state) {
    case EntitiesTranscriptionState.TranscriptionStateCompleted:
      return "completed";
    case EntitiesTranscriptionState.TranscriptionStateFailed:
      return "failed";
    case EntitiesTranscriptionState.TranscriptionStatePending:
      return "pending";
    case EntitiesTranscriptionState.TranscriptionStateProcessing:
      return "processing";
  }
};

const toRecordingState = (state: EntitiesRecordingState): RecordingState => {
  switch (state) {
    case EntitiesRecordingState.RecordingStateCreating:
      return "creating";
    case EntitiesRecordingState.RecordingStateStored:
      return "stored";
  }
};

export const respToRecording = (resp?: ControllerRecordingResponse): Recording => {
  if (!resp) return null;

  return {
    id: resp.id,
    transcription: resp.transcript,
    transcriptionState: toTranscriptionState(resp.transcriptionState),
    recordingState: toRecordingState(resp.recordingState),
    recording: new Blob(),
  };
};
