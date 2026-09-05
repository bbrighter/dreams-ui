import { Temporal } from "@js-temporal/polyfill";

import { ControllerDreamListResponse } from "@/api/generated_api";

import { Dream } from "./dream.types";

export type Dreams = Array<Dream>;

export function dreamsResponseToDreams(resp: ControllerDreamListResponse): Dreams {
  return resp.dreams.map((d) => {
    const date = Temporal.Instant.from(d.date);
    return {
      id: d.id,
      date: date,
      finalized: d.finalized,
      rating: d.rating ?? null,
      categories: d.categories?.map((v) => v.id) ?? [],
      description: d.description,
    };
  });
}
