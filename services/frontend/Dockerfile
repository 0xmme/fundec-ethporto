# pull official base image
FROM node:18.14.0-alpine

# set working directory
RUN mkdir -p /app/frontend
WORKDIR /app/frontend

# install and cache app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci

RUN mkdir /app/frontend/node_modules/.cache && chmod -R 777 /app/frontend/node_modules/.cache

# start app
CMD ["npm", "start"]