import { http, HttpResponse } from "msw";

import { EntityDreamResponse, EntityDreamsResponse } from "../../api/generated_api";
import { initialPrivateDreams, privateDream } from "./initialValues";

export const getDreamsHandler = (resp: EntityDreamsResponse) =>
  http.get("/dreams", () => HttpResponse.json(resp));
export const postDreamsHandler = (overrides?: number) =>
  http.post("/dreams", () => HttpResponse.json(overrides || 4));
export const getDreamsPrivateHandler = http.get("/dreams/private", () =>
  HttpResponse.json({ dreams: initialPrivateDreams }),
);
export const getDreamHandler = (resp: EntityDreamResponse) =>
  http.get("/dreams/:id", () => HttpResponse.json(resp));
export const getDreamPrivateHandler = http.get("/dreams/private/:id", () =>
  HttpResponse.json(privateDream()),
);
export const deleteDreamHandler = http.delete("/dreams/:id", () => HttpResponse.json());
export const patchDreamHandler = http.patch("/dreams/:id", () => HttpResponse.json());
export const patchDreamFinalizeHandler = http.patch("/dreams/:id/finalize", () =>
  HttpResponse.json(),
);
export const patchPrivateDreamHandler = http.patch("/dreams/private/:id", () =>
  HttpResponse.json(),
);
