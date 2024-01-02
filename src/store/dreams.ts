import { create } from "zustand";
import { get } from "./api";
import { isDreamsResponse } from "./interface";
import { dreamsURL } from "./url";

interface State {
    dreams: Array<{
        id: number;
        date: Date;
    }>;
}

interface Actions {
    get: () => Promise<void>;
}

interface DreamsStore extends State, Actions { }

const initialState: State = {
    dreams: [
        {
            id: 0,
            date: new Date(),
        },
    ],
};

const useDreams = create<DreamsStore>((set) => ({
    ...initialState,

    get: async () => {
        const url = dreamsURL()
        const resp = await get(url, isDreamsResponse);
        set({
            dreams: resp.dreams.map((d) => ({ id: d.id, date: new Date(d.date) })),
        });
    },
}));

export default useDreams;
