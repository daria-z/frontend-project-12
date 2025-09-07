import { describe, it, expect } from "vitest";
import authReducer, { setError, setLogin } from "./authSlice";

describe("authSlice", () => {
  const initialState = {
    isLoggedIn: false,
    username: null,
    token: null,
    error: null,
  };

  it("should handle login", () => {
    const action = setLogin({
      username: "admin",
      token: "admin_token",
    });
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({
      isLoggedIn: true,
      username: "admin",
      token: "admin_token",
      error: null,
    });
  });

  it("should handle setError", () => {
    const action = setError("Неверный пароль");
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      error: "Неверный пароль",
    });
  });
});







