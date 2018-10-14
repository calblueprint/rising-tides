class ApplicationController < ActionController::Base
  def after_sign_in_path_for(user)
    case
    when user.is_a?(Admin)
      admins_path
    else
      users_path
    end
  end
end
