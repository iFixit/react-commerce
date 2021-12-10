FROM node:14-alpine

EXPOSE 1337

# RUN apt-get update -yq && apt-get install libvips libvips-dev -yq
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash
RUN apk add g++ make python

RUN npm install -g @strapi/strapi@4.0.0 --unsafe-perm

WORKDIR /srv/app

ADD /docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["npm", "start"]