import { beforeEach, describe, expect, it, vi } from "vitest"

import { getDreamHandler, getDreamsHandler } from "../../__tests__/mocks/dreamsHandlers"
import { server } from "../../__tests__/setupTest"
import { EntityCategoryType } from "../../api/generated_api"
import { useDreams } from "../store"
import { categoriesService } from "./categories.service"
import { dreamService } from "./dream.service"
import { dreamsService } from "./dreams.service"
describe("dream service", () => {
  describe("get dream", () => {
    beforeEach(() => vi.resetAllMocks())
    it("not logged in", async () => {
      const { api } = useDreams.getState()
      const privateDetail = vi.spyOn(api!.dreams, "privateDetail")
      const publicDetail = vi.spyOn(api!.dreams, "dreamsDetail")
      await dreamService.getDream(1)

      const { dream } = useDreams.getState()
      expect(dream.id).toBe(1)
      expect(privateDetail).not.toHaveBeenCalled()
      expect(publicDetail).toHaveBeenCalled()
    })

    it.skip("logged in", async () => { // TODO: Enable test again
      const { api, setToken } = useDreams.getState()
      const privateDetail = vi.spyOn(api!.dreams, "privateDetail")
      const publicDetail = vi.spyOn(api!.dreams, "dreamsDetail")

      setToken("token")
      await dreamService.getDream(1)

      const { dream } = useDreams.getState()
      expect(dream.id).toBe(1)
      expect(privateDetail).toHaveBeenCalled()
      expect(publicDetail).not.toHaveBeenCalled()
    })
  })

  describe("patch dream", () => {
    beforeEach(async () => {
      await dreamService.getDream(1)
      await dreamsService.getDreams()
    })
    it("date", async () => {
      const date = new Date()
      const { setDate } = useDreams.getState()
      setDate(date)
      await dreamService.saveDream()

      const { dream } = useDreams.getState()
      expect(dream.date).toStrictEqual(date)
    })
    it("rating", async () => {
      const rating = 3
      const { setRating } = useDreams.getState()
      setRating(3)
      await dreamService.saveDream()

      const { dream } = useDreams.getState()
      expect(dream.rating).toStrictEqual(rating)
    })
    it("finalize", async () => {
      await dreamService.finalize()
      const { dream } = useDreams.getState()
      expect(dream.finalized).toBeTruthy()
    })
    it("visiblity", async () => {
      server.use(getDreamHandler({ visible: false }))
      server.use(getDreamsHandler([{ date: "2025-02-01T12:30:00.000Z", finalized: false, id: 1, visible: false, description: "", categories: [] }]))
      await dreamService.getDream(1)
      await dreamsService.getDreams()

      await dreamService.changeVisibility()
      const { dream } = useDreams.getState()
      expect(dream.visible).toBeTruthy()
    })
    it("description", async () => {
      const description = "description"
      const { setDescription } = useDreams.getState()
      setDescription(description)
      await dreamService.saveDream()

      const { dream } = useDreams.getState()
      expect(dream.description).toStrictEqual(description)
    })
  })

  describe("add category to dream", () => {
    beforeEach(async () => {
      await dreamService.getDream(1)
      await categoriesService.list()
      vi.resetAllMocks()
    })
    it("new category", async () => {
      const { api } = useDreams.getState()
      const categoriesCreate = vi.spyOn(api!.dreams, "categoriesCreate")
      await dreamService.addNewCategory("new category", EntityCategoryType.TypeCategory)

      const { dream, categories } = useDreams.getState()
      expect(categories).toHaveLength(3)
      expect(dream.categories).toHaveLength(3)
      expect(categoriesCreate).toHaveBeenCalledWith("1", { name: "new category", categoryType: "category" })
    })

    it("new person", async () => {
      const { api } = useDreams.getState()
      const categoriesCreate = vi.spyOn(api!.dreams, "categoriesCreate")
      await dreamService.addNewCategory("new category", EntityCategoryType.TypePerson)

      const { dream, categories } = useDreams.getState()
      expect(categories).toHaveLength(3)
      expect(dream.categories).toHaveLength(3)
      expect(categoriesCreate).toHaveBeenCalledWith("1", { name: "new category", categoryType: "person" })
    })

    it("existing category", async () => {
      const { api } = useDreams.getState()
      const categoriesUpdate = vi.spyOn(api!.dreams, "categoriesUpdate")
      await dreamService.addExistingCategory(1)

      const { dream, categories } = useDreams.getState()
      expect(categories).toHaveLength(2)
      expect(dream.categories).toHaveLength(3)
      expect(categoriesUpdate).toHaveBeenCalledWith("1", "1") // DreamId, CategoryId
    })
  })

  describe("remove category from dream", () => {
    beforeEach(async () => {
      await dreamService.getDream(1)
      await categoriesService.list()
      vi.resetAllMocks()
    })
    it("ok", async () => {
      await dreamService.removeCategory(1)

      const { dream, categories } = useDreams.getState()
      expect(dream.categories).toHaveLength(1)
      expect(categories).toHaveLength(2)
    })
  })
})
