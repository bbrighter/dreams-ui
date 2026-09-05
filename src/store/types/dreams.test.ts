import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";

import { ControllerDreamListResponse } from "@/api/generated_api";

import { dreamsResponseToDreams } from "./dreams.types";

test("dreamsResponseToDreams", () => {
  const resp: ControllerDreamListResponse = {
    dreams: [
      {
        id: 1,
        date: "2024-01-04T19:54:20.113Z",
        finalized: false,
        categories: [],
        description: "",
      },
    ],
  };

  const dreams = dreamsResponseToDreams(resp);

  expect(dreams).toHaveLength(1);
  expect(dreams[0].id).toBe(1);
  expect(dreams[0].date.equals(Temporal.Instant.from("2024-01-04T19:54:20.113Z"))).toBe(true);
  expect(dreams[0].finalized).toBe(false);
});
