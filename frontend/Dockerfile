FROM node:22 AS build-stage

WORKDIR /app

ARG PROD_API_URL

ENV VITE_API_URL=$PROD_API_URL

COPY . .
RUN npm ci

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build-stage /app/dist /usr/share/nginx/html

