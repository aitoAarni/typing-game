FROM node:22 AS build-stage

WORKDIR /app
COPY . .

RUN npm ci

RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit-dev

COPY --from=build-stage /app/dist ./dist

CMD [ "npm", "run", "start" ]