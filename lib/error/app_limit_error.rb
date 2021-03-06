module Error
  class AppLimitError < StandardError
    attr_reader :status, :error, :message

    def initialize(_error = nil, _status = nil, _message = nil)
      @error = _error || 422
      @status = _status || :unprocessable_entity
      @message = _message || 'Max applications for this project has been recieved.'
    end

    def fetch_json
      Error::Helpers::Render.json(error, message, status)
    end
  end
end
