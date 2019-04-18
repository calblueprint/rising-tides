FROM mhart/alpine-node:11 as node
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

FROM ruby:2.5.1-alpine

ENV GEM_PATH=/gems
ENV BUNDLE_PATH=/gems
ENV GEM_HOME=/gems
ENV RAILS_ENV=development
ENV NODE_ENV=development
ENV BUNDLER_VERSION=2.0.1 NPM_VERSION=6 YARN_VERSION=1.15.2
# ENV YARN_VERSION = 1.13.0

RUN apk update \
    && apk upgrade \
    && apk add --update --no-cache \
    build-base \
    libxml2-dev \
    libxslt-dev \
    postgresql-dev \
    tzdata \
    busybox-extras \
    bash \
    postgresql-client \
    curl \
    expect \
    yarn

WORKDIR /app
RUN gem install bundler -v ${BUNDLER_VERSION}
COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .

CMD ["./bin/webpack-dev-server", "bundle", "exec", "rails", "server"]