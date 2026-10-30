import { http, HttpResponse } from "msw/http";

import {
  ControllerDreamListResponse,
  ControllerDreamResponse,
  ControllerErrorResponse,
  ControllerRecordingResponse,
  EntitiesTranscriptionState,
} from "@/api/generated_api";

import { createRecording } from "../fixtures/dreams";

export const getDreamsHandler = (resp: ControllerDreamListResponse) =>
  http.get("/dreams", () => HttpResponse.json(resp));

export const postDreamsHandler = (overrides?: number) =>
  http.post("/dreams", () => HttpResponse.json(overrides || 4));

export const getDreamHandler = (resp: ControllerDreamResponse) =>
  http.get("/dreams/:id", () => HttpResponse.json(resp));

export const deleteDreamHandler = http.delete("/dreams/:id", () => HttpResponse.json());

export const patchDreamHandler = http.patch("/dreams/:id", () => HttpResponse.json());

export const patchDreamFinalizeHandler = http.patch("/dreams/:id/finalize", () =>
  HttpResponse.json(),
);

export const postRecordingHandler = (overrides?: ControllerRecordingResponse) =>
  http.post("/dreams/:id/recording", () => HttpResponse.json(createRecording(overrides)));

export const postTranscriptionHandler = (
  overrides: Partial<ControllerRecordingResponse> = {
    transcriptionState: EntitiesTranscriptionState.TranscriptionStateCompleted,
  },
  error?: ControllerErrorResponse & { status: number },
) =>
  http.post("/dreams/:id/transcribe", () =>
    HttpResponse.json(error ?? createRecording(overrides), { status: error ? error.status : 200 }),
  );
