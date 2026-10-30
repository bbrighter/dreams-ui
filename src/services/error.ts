import { ControllerErrorResponse } from "@/api/generated_api";

export const getApiErrorMessage = (err: unknown): string => {
  if (isControllerErrorResponse(err)) {
    return err.error.code + err.error.message;
  }

  if (err instanceof Error) {
    return err.message + err.cause;
  }

  return "Etwas ist schiefgelaufen";
};

const isControllerErrorResponse = (value: unknown): value is { error: ControllerErrorResponse } => {
  return (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof value.error === "object" &&
    value.error !== null &&
    "code" in value.error &&
    typeof value.error.code === "string" &&
    "message" in value.error &&
    typeof value.error.message === "string"
  );
};
