import { describe, expect, it } from "vitest";

import { postLoginHandler } from "@/__tests__/mocks/authHandlers";
import { server } from "@/__tests__/setupTest";
import { isLoggedIn } from "@/store/selectors";
import { useDreams } from "@/store/store";

import { authService } from "../auth.service";

describe("auth service", () => {
  describe("login", () => {
    it("success", async () => {
      const ok = await authService.login("password");

      expect(ok).toBeTruthy();
      const { token } = useDreams.getState();
      const loggedIn = isLoggedIn();
      expect(loggedIn).toBeTruthy();
      expect(token).toBe("token");
    });
    it("failure", async () => {
      server.use(postLoginHandler(true));
      const ok = await authService.login("password");
      expect(ok).toBeFalsy();

      const { user, token } = useDreams.getState();
      const loggedIn = isLoggedIn();
      expect(loggedIn).toBeFalsy();
      expect(user).toBe("Benni");
      expect(token).toBe("");
    });
  });

  describe("logout", () => {
    it("ok", async () => {
      await authService.logout();

      const { user, token } = useDreams.getState();
      const loggedIn = isLoggedIn();
      expect(loggedIn).toBeFalsy();
      expect(user).toBe("Benni");
      expect(token).toBe("");
    });
  });
});
