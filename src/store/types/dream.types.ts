import { EntityDreamResponse } from "../../api/generated_api"

export type Dream = {
  id: number
  date: Date
  description: string
  categories: Array<number>
  visible: boolean
  finalized: boolean
  rating: number | null
}

export function dreamResponseToDream(resp: EntityDreamResponse): Dream {
  return {
    id: resp.id,
    date: new Date(resp.date),
    description: resp.description,
    categories: resp.categories?.map(c => c.id) || [],
    visible: resp.visible,
    finalized: resp.finalized,
    rating: resp.rating ?? null,
  }
}

export const hashDream = (dream: Dream) => {
  return "D" + dream.description
    + "T" + dream.date.toISOString()
    + "R" + dream.rating?.toString()
}
