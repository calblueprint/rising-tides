FROM ethanlee/whales
WORKDIR /app
ENV GEM_PATH=/gems
ENV BUNDLE_PATH=/gems
ENV GEM_HOME=/gems
COPY . .
RUN gem install bundler
RUN bundle install
CMD ["bundle", "exec", "rails", "server"]
