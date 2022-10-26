FROM node:14.18.2
RUN apt update -y && apt upgrade -y
WORKDIR /app
COPY ./ .
RUN npm install
EXPOSE 8070
RUN npm run build
CMD ["npm", "run", "start"]


# FROM nginx:1.20-alpine as web
# COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template
# EXPOSE 80
