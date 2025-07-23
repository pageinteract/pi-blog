FROM node:18-alpine AS base

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1

FROM base AS deps

WORKDIR /opt/

COPY package.json yarn.lock ./

RUN yarn config set network-timeout 600000 -g && yarn install --frozen-lockfile

ENV PATH /opt/node_modules/.bin:$PATH

FROM base AS builder

WORKDIR /opt/app

COPY --from=deps /opt/node_modules ./node_modules

COPY . .

RUN yarn build

FROM base AS runner

RUN addgroup --system --gid 1001 strapi
RUN adduser --system --uid 1001 strapi

WORKDIR /opt/app

COPY --from=builder --chown=strapi:strapi /opt/app ./

USER strapi

EXPOSE 1337

ENV NODE_ENV production

CMD ["yarn", "start"]
