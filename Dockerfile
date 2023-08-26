FROM node:alpine as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build


FROM node:alpine as production

WORKDIR /app

COPY package.json .

RUN npm install

COPY --from=build /app/dist .

COPY .env .env

RUN sleep 3

CMD ["node", "bundle.js"]