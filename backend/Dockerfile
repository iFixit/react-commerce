FROM strapi/base:alpine

ARG STRAPI_VERSION
RUN yarn global add @strapi/strapi@${STRAPI_VERSION}

WORKDIR /srv/app

COPY ./package*.json ./
RUN npm install

COPY ./src/ ./src/
COPY ./config/ ./config/
COPY ./database/ ./database/
COPY ./public/ ./public/

RUN npm run build

CMD ["npm", "start"]