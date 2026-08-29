import { Api } from "../../api/generated_api";

export type ApiState = {
  api: Api<unknown> | null;
};

interface ApiActions {
  initApi: () => Promise<void>;
}

export type ApiSlice = ApiState & ApiActions;
