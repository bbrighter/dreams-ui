import { ControllerTagResponse, } from "../api/generated_api"
import { tagResponseToTags } from "./tags"

test('tagResponseToTags', () => {
    const resp: Array<ControllerTagResponse> =
        [
            { id: 1, title: "Title" },
            { id: 2, title: "Title 2" },
        ]


    const tags = tagResponseToTags(resp)

    expect(tags).toHaveLength(2)
    expect(tags[0].id).toBe(1)
    expect(tags[0].title).toBe("Title")
})