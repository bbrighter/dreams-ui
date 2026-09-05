import { http, HttpResponse } from "msw";

import { ControllerDreamListResponse, ControllerDreamResponse } from "@/api/generated_api";

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
