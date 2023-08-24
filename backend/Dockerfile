FROM node:18-alpine3.18
RUN apk update && apk add python3 build-base
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY --chown=node:node ./package.json ./
COPY --chown=node:node ./yarn.lock ./
COPY --chown=node:node ./src/plugins/addons/package.json ./src/plugins/addons/
COPY --chown=node:node ./src/plugins/addons/yarn.lock ./src/plugins/addons/

ENV PATH /opt/node_modules/.bin:$PATH

RUN yarn config set network-timeout 600000 -g
RUN yarn install:all && yarn cache clean --all

COPY --chown=node:node ./ .

RUN NODE_ENV=production yarn build

EXPOSE 1337
USER node
CMD ["yarn", "start"]
