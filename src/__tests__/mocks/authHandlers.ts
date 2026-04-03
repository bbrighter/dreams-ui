import { http, HttpResponse } from "msw"

import { EntityLoginResponse } from "../../api/generated_api"

export const postLoginHandler = (failure?: boolean) => http.post("/login",
  () => {
    if (failure) {
      return HttpResponse.error()
    }
    return HttpResponse.json({ token: "token" } satisfies EntityLoginResponse)
  })
export const postLogoutHandler = () => http.post("/logout", () => HttpResponse.json({}))
