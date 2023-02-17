# stage 1: build project
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2: create image
FROM nginx:alpine
COPY --from=node /app/dist/dot-auth-app /usr/share/nginx/html