module Accessible
  extend ActiveSupport::Concern
  included do
    before_action :check_user
  end

  protected
  def check_user
    if current_admin
      flash.clear
      # if you have rails_admin. You can redirect anywhere really
      redirect_to(rails_admin.dashboard_path) && return
    elsif current_community_leader
      flash.clear
      # The authenticated root path can be defined in your routes.rb in: devise_scope :user do...
      redirect_to(authenticated_community_leader_root_path) && return
    elsif current_volunteer
    flash.clear
    # The authenticated root path can be defined in your routes.rb in: devise_scope :user do...
    redirect_to(authenticated_volunteer_root_path) && return
    end

  end
end