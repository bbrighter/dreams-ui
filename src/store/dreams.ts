import { EntityDreamsResponse } from "../api/generated_api";

export interface Dreams {
    dreams: Array<{
        id: number;
        date: Date;
        visible: boolean
    }>;
}

export function dreamsResponseToDreams(resp: EntityDreamsResponse): Dreams {
    return {
        dreams: resp.dreams.map(d =>
            ({ id: d.id, date: new Date(d.date), visible: d.visible }))
    }
}