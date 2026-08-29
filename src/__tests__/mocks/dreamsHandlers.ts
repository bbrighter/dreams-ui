import { http, HttpResponse } from "msw";

import { EntityDreamResponse, EntityDreamsResponse } from "../../api/generated_api";

export const getDreamsHandler = (resp: EntityDreamsResponse) =>
  http.get("/dreams", () => HttpResponse.json(resp));

export const postDreamsHandler = (overrides?: number) =>
  http.post("/dreams", () => HttpResponse.json(overrides || 4));

export const getDreamsPrivateHandler = (resp: EntityDreamsResponse) =>
  http.get("/dreams/private", () => HttpResponse.json(resp));

export const getDreamHandler = (resp: EntityDreamResponse) =>
  http.get("/dreams/:id", () => HttpResponse.json(resp));

export const getDreamPrivateHandler = (resp: EntityDreamResponse) =>
  http.get("/dreams/private/:id", () => HttpResponse.json(resp));

export const deleteDreamHandler = http.delete("/dreams/:id", () => HttpResponse.json());

export const patchDreamHandler = http.patch("/dreams/:id", () => HttpResponse.json());

export const patchDreamFinalizeHandler = http.patch("/dreams/:id/finalize", () =>
  HttpResponse.json(),
);

export const patchPrivateDreamHandler = http.patch("/dreams/private/:id", () =>
  HttpResponse.json(),
);
