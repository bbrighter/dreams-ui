import { EntityDreamsResponse } from "../../api/generated_api";
import { Dream } from "./dream.types";

export type Dreams = Array<Dream>;

export function dreamsResponseToDreams(resp: EntityDreamsResponse): Dreams {
  return resp.dreams.map((d) => {
    const date = new Date(d.date);
    return {
      id: d.id,
      date: date,
      visible: d.visible,
      finalized: d.finalized,
      rating: d.rating ?? null,
      categories: d.categories?.map((v) => v.id) ?? [],
      description: d.description,
    };
  });
}
