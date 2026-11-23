# ---- Build: genera dist/ estático ----
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Las variables PUBLIC_* se fijan en el build (Astro las incrusta en el HTML/JS).
ARG PUBLIC_API_URL
ARG PUBLIC_PRIVACY_URL
ARG PUBLIC_GTM_ID
ENV PUBLIC_API_URL=$PUBLIC_API_URL \
    PUBLIC_PRIVACY_URL=$PUBLIC_PRIVACY_URL \
    PUBLIC_GTM_ID=$PUBLIC_GTM_ID
RUN npm run build

# ---- Runtime: nginx sirviendo dist/ ----
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
