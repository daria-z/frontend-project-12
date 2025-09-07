import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, // Добавляем редьюсер RTK Query
    auth: authReducer, // auth: { isLoggedIn, username, email, token, error }
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware), // Добавляем middleware RTK Query
});

export default store;
// {
//   authApi: {
//     queries: {},
//     mutations: {},
//     provided: {}, // Пусто, так как нет кэшированных данных
//     subscriptions: {}, // Пусто, так как нет активных подписок
//     config: {
//       online: true, // Статус подключения к сети
//       focused: true, // Статус активности окна браузера
//       middlewareRegistered: true, // Подтверждение регистрации middleware
//       refetchOnFocus: false, // Настройки RTK Query
//       refetchOnReconnect: false,
//       reducerPath: "authApi"
//     }
//   },
//   auth: {
//     isLoggedIn: false, // Пользователь не авторизован
//     username: null,
//     email: null,
//     token: null,
//     error: null
//   }
// }

