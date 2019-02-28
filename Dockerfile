FROM ethanlee/whales

ENV GEM_PATH=/gems
ENV BUNDLE_PATH=/gems
ENV GEM_HOME=/gems
RUN bundle install
ENV BUNDLER_VERSION=1.16.6

RUN gem install bundler -v $BUNDLER_VERSION --no-ri --no-rdoc

COPY . .
RUN bundle install
RUN yarn install

CMD ["bundle", "exec", "rails", "server"]
