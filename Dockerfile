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
CMD ["pm2-runtime", "index.js"]
# docker build . --target prod -t sg/site
# docker run -it -e "PM2_PUBLIC_KEY={{PUBLIC}}" -e "PM2_SECRET_KEY={{SECRET}}" -p "80:80" --restart unless-stopped sg/site
