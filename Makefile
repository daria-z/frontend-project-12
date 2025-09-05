install:
	npm run install:all

dev:
	npm run dev

frontend:
	npm run start:frontend

start:
	npm run start

build:
	rm -rf frontend/dist
	npm run build
