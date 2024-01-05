import { create } from "zustand";
import { _delete, get } from "./api";
import { isDreamsResponse } from "./interface";
import { dreamURL, dreamsURL } from "./url";

interface State {
    dreams: Array<{
        id: number;
        date: Date;
    }>;
}

interface Actions {
    get: () => Promise<void>
    delete: (id: number) => Promise<void>
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
    delete: async (id: number) => {
        const url = dreamURL(id)
        const ok = await _delete(url)
        if (ok) {
            set((state) => ({
                dreams: state.dreams.filter(d => d.id != id)
            }))
        }
    }
}));

export default useDreams;
