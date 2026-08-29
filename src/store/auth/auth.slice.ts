import { StateCreator } from "zustand";

import { AuthSlice, AuthState } from "./auth.types";

const createInitialState = (): AuthState => ({
  token: "",
  user: "Benni",
});

export const createAuthSlice: StateCreator<AuthState, [["zustand/immer", never]], [], AuthSlice> = (
  set,
  _get,
) => ({
  ...createInitialState(),
  setToken: (token: string) =>
    set((state: AuthState) => {
      state.token = token;
    }),
  resetAuth: () => set(() => createInitialState()),
});
