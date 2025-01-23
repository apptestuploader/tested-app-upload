FROM --platform=linux/amd64 node:18-alpine as dev

WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn

COPY . .

FROM dev as build
WORKDIR app

RUN yarn build

FROM --platform=linux/amd64 nginx:latest as prod

COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
