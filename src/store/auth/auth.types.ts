export type AuthState = {
  user: string;
  token: string;
};

interface AuthActions {
  setToken: (token: string) => void;
  resetAuth: () => void;
}

export interface AuthSlice extends AuthState, AuthActions {}
