FROM node:16-alpine
# Installing libvips for sharp compatibility
RUN apk --update-cache add vips-dev \
 && rm -rf /var/cache/apk/*
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./package.json ./
COPY ./yarn.lock ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN yarn config set network-timeout 600000 -g
RUN yarn install
WORKDIR /opt/app
COPY ./ .
RUN NODE_ENV=production yarn build
EXPOSE 1337
CMD ["yarn", "start"]