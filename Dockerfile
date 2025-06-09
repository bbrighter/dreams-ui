FROM node:22-alpine3.21 AS build
WORKDIR /app
RUN corepack enable
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile
COPY . . 
RUN pnpm build


FROM nginx:1.27.5-alpine3.21-slim
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
 