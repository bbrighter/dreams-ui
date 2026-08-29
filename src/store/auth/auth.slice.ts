import { StateCreator } from "zustand";

import { AuthSlice, AuthState, StoreSlice } from "../interface";

const createInitialState = (): AuthState => ({
  token: "",
  user: "Benni",
});

export const createAuthSlice: StateCreator<
  StoreSlice,
  [["zustand/immer", never]],
  [],
  AuthSlice
> = (set, _get) => ({
  ...createInitialState(),
  setToken: (token: string) =>
    set((state: AuthState) => {
      state.token = token;
    }),
  resetAuth: () => set(() => createInitialState()),
});
