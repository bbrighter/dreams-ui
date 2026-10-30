import { Temporal } from "@js-temporal/polyfill";
import { beforeEach, describe, expect, it } from "vitest";

import { deleteRecordingHandler, getRecordingHandler } from "@/__tests__/mocks/recordingsHandler";
import { server } from "@/__tests__/setupTest";
import { useDreams } from "@/store/store";

import { recordingService } from "../recording.service";

describe("deleteRecording", () => {
  beforeEach(() => {
    const { setRecording, setDream } = useDreams.getState();
    setRecording({
      id: 10,
      recording: new Blob(),
      recordingState: "stored",
      transcription: "Transcript",
      transcriptionState: "completed",
    });
    setDream({
      id: 1,
      recordingId: 10,
      categories: [],
      date: Temporal.Now.instant(),
      description: "",
      finalized: false,
      rating: null,
    });
  });

  it("Ok", async () => {
    server.use(deleteRecordingHandler());

    await recordingService.deleteRecording(10);

    const { recording, dream } = useDreams.getState();
    expect(recording).toBeNull();
    expect(dream.recordingId).toBeNull();
  });
});

describe("getRecording", () => {
  beforeEach(() => {
    const { setRecording } = useDreams.getState();
    setRecording({
      id: 10,
      recording: new Blob(),
      recordingState: "stored",
      transcription: "",
      transcriptionState: "pending",
    });
  });

  it("Ok", async () => {
    server.use(getRecordingHandler(new Blob(["1234"])));
    await recordingService.getRecording(10);

    const { recording } = useDreams.getState();
    expect(recording?.recording.size).toBe(4);
  });
});
