import { http, HttpResponse } from "msw"; // передоставляет методы для запросов
// описывает как обрабатываются запросы

export const handlers = [
  http.post("/api/v1/login", () => {
    return HttpResponse.json({
      token: "admin_token",
      username: "admin"
    });
    // const { username, password } = req.body; // данные из запроса
    // if (username === "admin" && password === "admin") {
    //   // имитирует логику сервера
    //   return res(
    //     ctx.status(200),
    //     ctx.json({ token: "admin_token", username: "admin" })
    //   );
    // }
    // return res(
    //   ctx.status(401),
    //   ctx.json({
    //     statusCode: 401,
    //     error: "Unauthorized",
    //     message: "Unauthorized",
    //   })
    // );
  }),
];








