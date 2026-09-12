import "regenerator-runtime/runtime";
import "@testing-library/jest-dom/vitest";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";

import { useDreams } from "../store/store";
import handlers from "./mocks/handlers";

export const server = setupServer(...handlers);

beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});
beforeEach(async () => {
  vi.resetAllMocks();
  const store = useDreams.getState();
  store.resetCategories();
  store.resetDream();
  store.resetDreams();
  store.resetStatistics();
  const init = useDreams.getState().initApi;
  await init();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());
