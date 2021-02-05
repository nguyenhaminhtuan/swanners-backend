FROM node:14.15-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14.15-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production && \
  npm i -g prisma

COPY --from=build /usr/src/app/dist dist
COPY --from=build /usr/src/app/prisma prisma

ARG DATABASE_URL
ENV DATABASE ${DATABASE_URL}

RUN prisma generate
RUN prisma migrate deploy --preview-feature

CMD ["npm", "run", "start:prod"]