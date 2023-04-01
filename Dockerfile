# FROM node:lts-alpine
# RUN npm install -g http-server
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# EXPOSE 8080
# CMD [ "http-server", "dist" ]


# Paso 1: Contruir la aplicacion de vue 3 del proyecto del modulo 6
FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Paso 2: Crear el nginx server
FROM nginx:1.23.4-alpine as prod-stage
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

