import "regenerator-runtime/runtime"

import * as matchers from "@testing-library/jest-dom/matchers"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, beforeEach, expect } from "vitest"

import { useDreams } from "../store"
import handlers from "./mocks/handlers"

expect.extend(matchers)

export const server = setupServer(...handlers)

beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" })
})
beforeEach(async () => {
  useDreams.getState().resetState()
  const init = useDreams.getState().initApi
  await init()
})
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => server.close())
