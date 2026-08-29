import { beforeEach, describe, expect, it } from "vitest";

import { createDream, createDreams } from "@/__tests__/fixtures/dreams";
import { getDreamsHandler, postDreamsHandler } from "@/__tests__/mocks/dreamsHandlers";
import { server } from "@/__tests__/setupTest";
import { useDreams } from "@/store/store";

import { dreamsService } from "../dreams.service";

describe("dream service", () => {
  describe("get dreams", () => {
    it("ok", async () => {
      server.use(getDreamsHandler(createDreams({ id: 1 })));
      await dreamsService.getDreams();

      const { dreams } = useDreams.getState();
      expect(dreams).toHaveLength(1);
    });

    it("sorted by date", async () => {
      server.use(
        getDreamsHandler(
          createDreams([
            {
              date: "2027-01-01T12:30:00Z",
              finalized: false,
              id: 1,
              visible: true,
              categories: [],
              description: "",
            },
            {
              date: "2026-01-01T12:30:00Z",
              finalized: false,
              id: 2,
              visible: true,
              categories: [],
              description: "",
            },
          ]),
        ),
      );
      await dreamsService.getDreams();

      const { dreams } = useDreams.getState();
      expect(dreams[0].date.valueOf()).toBeGreaterThan(dreams[1].date.valueOf());
    });
  });

  describe("delete dream", () => {
    it("ok", async () => {
      await dreamsService.getDreams();
      await dreamsService.deleteDream(1);

      const { dreams } = useDreams.getState();
      expect(dreams).toHaveLength(0);
    });
  });

  describe("post dream", () => {
    it("ok", async () => {
      server.use(postDreamsHandler(2), getDreamsHandler(createDreams(createDream({ id: 1 }))));
      await dreamsService.getDreams();

      const id = await dreamsService.postDream();

      expect(id).toBe(2);
      const { dreams } = useDreams.getState();
      expect(dreams).toHaveLength(2);
    });
  });
});
