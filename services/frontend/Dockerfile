# pull official base image
FROM node:18.14.0-alpine

# set working directory
RUN mkdir -p /app
WORKDIR /app

# install and cache app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci

RUN mkdir /app/node_modules/.cache && chmod -R 777 /app/node_modules/.cache

# start app
CMD ["npm", "start"]