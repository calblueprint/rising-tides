module Accessible
  extend ActiveSupport::Concern
  included do
    before_action :check_user
  end

  protected
  def check_user
    if current_user
      flash.clear
      # The authenticated root path can be defined in your routes.rb in: devise_scope :user do...
      if current_user.Admin?
        redirect_to(rails_admin_path) && return
      end
      redirect_to(authenticated_user_root_path) && return
    end
  end
end