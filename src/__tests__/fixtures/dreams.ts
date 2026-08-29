import { EntityDreamResponse, EntityDreamsResponse } from "@/api/generated_api";

export const createDreams = (
  overrides: Array<EntityDreamResponse> | Partial<EntityDreamResponse> = [],
): EntityDreamsResponse => ({
  dreams: Array.isArray(overrides) ? overrides : [createDream(overrides)],
});

export const createDream = (overrides: Partial<EntityDreamResponse> = {}): EntityDreamResponse => ({
  id: 1,
  date: "2026-08-29T12:00:00Z",
  categories: [],
  description: "",
  finalized: false,
  visible: true,
  ...overrides,
});
