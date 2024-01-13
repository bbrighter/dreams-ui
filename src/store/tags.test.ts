import { ControllerTagsResponse } from "../api/generated_api"
import { TagResponseToTags } from "./tags"

test('tagResponseToTags', () => {
    const resp: ControllerTagsResponse = {
        tags: [
            { id: 1, title: "Title" },
            { id: 2, title: "Title 2" },
        ]
    }

    const tags = TagResponseToTags(resp)

    expect(tags).toHaveLength(2)
    expect(tags[0].id).toBe(1)
    expect(tags[0].title).toBe("Title")
})