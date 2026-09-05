import { ControllerDreamListResponse, ControllerDreamResponse } from "@/api/generated_api";

export const createDreams = (
  overrides: Array<ControllerDreamResponse> | Partial<ControllerDreamResponse> = [],
): ControllerDreamListResponse => ({
  dreams: Array.isArray(overrides) ? overrides : [createDream(overrides)],
});

export const createDream = (
  overrides: Partial<ControllerDreamResponse> = {},
): ControllerDreamResponse => ({
  id: 1,
  date: "2026-08-29T12:00:00Z",
  categories: [],
  description: "",
  finalized: false,
  ...overrides,
});
