import { useDreams } from "../store";

export const authService = {
  login: async (password: string): Promise<boolean> => {
    const { user, setToken, api } = useDreams.getState();
    if (!api) return false;
    try {
      const resp = await api.login.loginCreate({ name: user, password: password });
      if (!resp.ok) return false;

      setToken(resp.data.token);
      return resp.ok;
    } catch {
      return false;
    }
  },
  logout: async () => {
    const { resetAuth, api } = useDreams.getState();
    if (!api) return;
    const resp = await api.logout.logoutCreate();

    if (resp.ok) {
      resetAuth();
    }
  },
};
