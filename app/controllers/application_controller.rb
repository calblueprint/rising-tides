class ApplicationController < ActionController::Base
  def after_sign_in_path_for(user)
    user_session_path
    end
end
