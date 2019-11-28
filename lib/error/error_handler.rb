module Error
  module Helpers
    module Render
      def self.json(_error, _status, _message)
        {
          status: _status,
          error: _error,
          message: _message
        }.as_json
      end
    end
  end

  module ErrorHandler
    def self.included(clazz)
      clazz.class_eval do
        rescue_from ActiveRecord::RecordNotFound do |e|
          respond(:record_not_found, 404, e.to_s)
        end
        rescue_from StandardError do |e|
          respond(:standard_error, 500, e.to_s)
          # We raise the error again for useful Sentry/logging output
          raise e
        end
        rescue_from AppLimitError do |e|
          respond(e.error, e.status, e.message)
        end
        rescue_from MaxProjUserError do |e|
          respond(e.error, e.status, e.message)
        end
      end
    end

    private

    def respond(_error, _status, _message)
      json = Error::Helpers::Render.json(_error, _status, _message)
      render json: json, status: _status
    end
  end
end