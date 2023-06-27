FROM node:18-alpine3.18
# Installing libvips for sharp compatibility
RUN apk --update-cache add vips-dev \
  && rm -rf /var/cache/apk/*
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./src/plugins/addons/package.json ./src/plugins/addons/
COPY ./src/plugins/addons/yarn.lock ./src/plugins/addons/
ENV PATH /opt/node_modules/.bin:$PATH
RUN yarn config set network-timeout 600000 -g
RUN yarn install:all && yarn cache clean --all
COPY ./ .
RUN NODE_ENV=production yarn build
EXPOSE 1337
CMD ["yarn", "start"]
