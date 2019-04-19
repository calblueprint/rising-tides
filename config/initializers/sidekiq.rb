Sidekiq.configure_server do |config|
  config.redis = { :url => 'redis://localhost:6379/' }
end 

Sidekiq.configure_client do |config|
  config.redis = { :url => 'redis://localhost:6379/' }
end 

Sidekiq.default_worker_options = { throttle: { threshold: 4, period: 1.second } }
