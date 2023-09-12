FROM node:20-slim as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build


FROM node:20-slim

WORKDIR /app

COPY package.json .

RUN npm install --production

COPY --from=build /app/dist .

COPY .env .env

RUN sleep 3

CMD ["node", "bundle.js"]