class ApplicationController < ActionController::Base
  include Error::ErrorHandler

  def after_sign_in_path_for(resource)
    stored_location_for(resource) ||
        if resource.is_a?(Admin)
          rails_admin.dashboard_path
        else
          super
        end
  end
end
