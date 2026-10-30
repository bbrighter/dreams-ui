import { http, HttpResponse } from "msw/http";

export const deleteRecordingHandler = () =>
  http.delete("/recordings/:id", () => HttpResponse.json({}));

export const getRecordingHandler = (overrides: Blob = new Blob(["123"])) =>
  http.get(
    "/recordings/:id",
    () =>
      new HttpResponse(overrides, {
        headers: { "Content-Type": "audio/webm" },
      }),
  );
