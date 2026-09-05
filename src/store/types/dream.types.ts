import { Temporal } from "@js-temporal/polyfill";

import { ControllerDreamResponse } from "@/api/generated_api";

export type Dream = {
  id: number;
  date: Temporal.Instant;
  description: string;
  categories: Array<number>;
  finalized: boolean;
  rating: number | null;
};

export function dreamResponseToDream(resp: ControllerDreamResponse): Dream {
  return {
    id: resp.id,
    date: Temporal.Instant.from(resp.date),
    description: resp.description,
    categories: resp.categories?.map((c) => c.id) || [],
    finalized: resp.finalized,
    rating: resp.rating ?? null,
  };
}

export const hashDream = (dream: Dream) => {
  return "D" + dream.description + "T" + dream.date.toString() + "R" + dream.rating?.toString();
};
