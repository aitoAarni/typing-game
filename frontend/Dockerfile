FROM node:20

WORKDIR /app

COPY . .

RUN npm ci


CMD [ "npm", "run", "dev", "--", "--host" ]