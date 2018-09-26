class ApplicationController < ActionController::Base
  def after_sign_in_path_for(user)
    case
    when user.is_a?(Admin)
      admins_path
    when user.is_a?(CommunityLeader)
      community_leaders_path
    else
      volunteers_path
    end
  end
end
