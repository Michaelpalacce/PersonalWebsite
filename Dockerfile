FROM node:14-alpine as base
RUN npm i -g pm2
EXPOSE 80

# Development
FROM base as dev
WORKDIR /app

# Production
FROM base as prod
WORKDIR /app
COPY . .
RUN npm i
RUN touch .env
RUN echo -en 'REQUEST_TIMEOUT=60000\nTEMPLATES_DIR=public/html' > .env
CMD ["pm2-runtime", "ecosystem.config.js"]

# docker build -t stefangenov/site:latest --target prod . && docker push stefangenov/site:latest

# docker build -t stefangenov/site:latest --target prod .
# docker run --rm -it -p "80:80" -e "ADMIN_USERNAME=root" -e "ADMIN_PASSWORD=toor" -e "ENV=dev" --name site stefangenov/site