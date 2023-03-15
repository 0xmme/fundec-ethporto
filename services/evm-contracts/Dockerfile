# pull official base image
FROM node:16.13.0-alpine

# set working directory
RUN mkdir -p /app
WORKDIR /app

# add `/app/evm-contracts/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install system dependencies
RUN apk add --no-cache curl

# install and cache app dependencies
COPY . .
RUN chown -R node:node /app
USER node
RUN npm ci && chown -R node:node /app

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
RUN mkdir -p /app/artifacts && chmod -R 777 /app/artifacts
RUN mkdir -p /app/cache && chmod -R 777 /app/cache

RUN chmod 0644 /app/scripts/deploy.ts
RUN chmod +x /app/entrypoint.sh

# start app
ENTRYPOINT ["/app/entrypoint.sh"]