import { describe, it, expect, beforeEach } from "vitest";
import { server } from "../../mocks/server";
import { login } from "../../api/login";
import { http, HttpResponse } from "msw";

describe("login API", () => {
  beforeEach(() => {
    // Сбрасываем сервер
    server.resetHandlers();
  });

  it("успешно выполняет логин и возвращает токен", async () => {
    const value = { username: "admin", password: "admin" };
    const response = await login(value);

    expect(response).toEqual({
      token: "admin_token",
      username: "admin",
    });
  });

  it("обрабатывает ошибку при неверных данных", async () => {
    // имитируем ошибку
    server.use(
      http.post("/api/v1/login", () => {
        return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
      })
    );

    const value = { username: "wrong", password: "wrong" };
    await expect(login(value)).rejects.toThrow("Unauthorized");
  });

  it("обрабатывает ошибку при проблемах с сетью", async () => {
    server.use(
      http.post("/api/v1/login", () => {
        return HttpResponse.error();
      })
    );

    const value = { username: "admin", password: "admin" };
    await expect(login(value)).rejects.toThrow("Network Error");
  });
});

// TODO: добавить на пустой ответ






