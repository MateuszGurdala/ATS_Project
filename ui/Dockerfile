FROM node:latest AS base
USER $APP_UID
EXPOSE 80
WORKDIR /app

FROM node:latest AS build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm i

COPY . .
RUN npm run build

FROM nginx:stable-alpine AS publish
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ui/browser /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
