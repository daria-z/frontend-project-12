### Hexlet tests and linter status:
[![Actions Status](https://github.com/daria-z/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/daria-z/frontend-project-12/actions)

Вы можете протестировать приложение по ссылке:
https://frontend-project-12-xioh.onrender.com

# Настройка и скрипты проекта

Этот проект представляет собой монорепозиторий, включающий фронтенд, разработанный на [Vite](https://vitejs.dev/), и бэкенд, использующий [@hexlet/chat-server](https://www.npmjs.com/package/@hexlet/chat-server).

Структура проекта:

```
root/
├── frontend/      # Фронтенд на основе Vite
├── server/        # Бэкенд на основе @hexlet/chat-server
└── package.json   # Корневой package.json с общими скриптами
```

Корневой `package.json` содержит скрипты для управления фронтендом и бэкендом. Ниже описаны все доступные скрипты и их назначение.


## Доступные скрипты

Все команды следует выполнять из **корневой директории** проекта, если не указано иное.

| Скрипт              | Команда                          | Описание                                                                 |
|---------------------|----------------------------------|--------------------------------------------------------------------------|
| `install:all`       | `npm run install:all`           | Устанавливает зависимости для корня, `frontend` и `server` |
| `build`             | `npm run build`                 | Собирает фронтенд в `frontend/dist`. |
| `start`             | `npm run start`                 | Запускает бэкенд (`@hexlet/chat-server`) в продакшен-режиме, обслуживая фронтенд из `frontend/dist`. |
| `start:frontend`    | `npm run start:frontend`        | Запускает сервер разработки Vite для фронтенда (выполняется в `frontend`). |
| `start:server`      | `npm run start:server`          | Запускает бэкенд в режиме разработки (выполняется в `server`). |
| `dev`               | `npm run dev`                   | Запускает серверы фронтенда и бэкенда параллельно с помощью `concurrently`. |
| `render:all`        | `npm run render:all`            | Подготавливает проект к деплою: устанавливает зависимости (`install:all`) и собирает фронтенд (`build`). |

## Примеры использования

1. **Установка зависимостей**:
   Для настройки проекта установите все зависимости для корня, фронтенда и бэкенда:
   ```bash
   npm run install:all
   ```

2. **Запуск в режиме разработки**:
   Для запуска фронтенда (Vite dev server) и бэкенда (chat server) в режиме разработки:
   ```bash
   npm run dev
   ```

3. **Сборка для продакшена**:
   Для сборки фронтенда в продакшен-режиме.

      Это создаст папку `frontend/dist` с готовыми статическими файлами фронтенда.

   ```bash
   npm run build
   ```



4. **Запуск в продакшен-режиме**:
   Для запуска бэкенда, который также обслуживает статические файлы фронтенда из `frontend/dist`:
   ```bash
   npm run start
   ```

Vitest `http://localhost:51204/__vitest__/#/`
