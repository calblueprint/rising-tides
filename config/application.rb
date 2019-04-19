require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RisingTides
  class Application < Rails::Application
    Raven.configure do |config|
      config.dsn = 'https://61fe6a36b7434af4afc76088856e94e7:f39d4353e36b40bc8c6566350e22425b@sentry.io/1440176'
    end
    
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
    config.autoload_paths += %W(#{config.root}/lib)
    config.exceptions_app = routes
  end
end
