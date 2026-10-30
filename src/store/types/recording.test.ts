import { describe, expect, it } from "vitest";

import {
  ControllerRecordingResponse,
  EntitiesRecordingState,
  EntitiesTranscriptionState,
} from "@/api/generated_api";

import { respToRecording } from "./recording.types";

describe("respToRecording", () => {
  it("Full response", () => {
    const resp: ControllerRecordingResponse = {
      id: 1,
      mimeType: "mime",
      recordingState: EntitiesRecordingState.RecordingStateCreating,
      transcript: "transcription",
      transcriptionState: EntitiesTranscriptionState.TranscriptionStateCompleted,
    };

    const rec = respToRecording(resp);
    expect(rec?.id).toBe(1);
    expect(rec?.recordingState).toBe("creating");
    expect(rec?.transcriptionState).toBe("completed");
    expect(rec?.transcription).toBe("transcription");
  });

  it("No recording", () => {
    const rec = respToRecording(undefined);

    expect(rec).toBeNull();
  });
});
