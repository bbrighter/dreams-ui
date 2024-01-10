import { create } from "zustand";
import api from "../api/api";


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
        const resp = await api.dreams.dreamsList()
        const dreams = resp.data.dreams.map((d) => ({ id: d.id, date: new Date(d.date) }))
        dreams.sort((a, b) => b.date.getTime() - a.date.getTime())
        set({ dreams: dreams });
    },
    delete: async (id: number) => {
        const resp = await api.dreams.dreamsDelete(id.toString())
        if (resp.ok) {
            set((state) => ({
                dreams: state.dreams.filter(d => d.id != id)
            }))
        }
    }
}));

export default useDreams;
