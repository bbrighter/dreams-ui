import { ControllerCategoryResponse, } from "../api/generated_api"
import { categoryResponseToCategories } from "./categories"

test('tagResponseToTags', () => {
    const resp: Array<ControllerCategoryResponse> =
        [
            { id: 1, name: "Title" },
            { id: 2, name: "Title 2" },
        ]


    const categories = categoryResponseToCategories(resp)

    expect(categories).toHaveLength(2)
    expect(categories[0].id).toBe(1)
    expect(categories[0].name).toBe("Title")
})