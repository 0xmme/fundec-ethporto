# pull official base image
FROM node:16.13.0-alpine

# set working directory
RUN mkdir -p /src
WORKDIR /src

# add `/app/evm-contracts/app/node_modules/.bin` to $PATH
ENV PATH /src/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . .
RUN npm ci

USER root

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

RUN chmod 0644 /src/scripts/deploy.ts
RUN chmod +x /src/entrypoint.sh

# start app
ENTRYPOINT ["/src/entrypoint.sh"]