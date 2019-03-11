class OrganizationsController < ApplicationController
  #before_action :set_organization, only: [:show, :edit, :update, :destroy]

  def dashboard
  end

  def show
    @organization = Organization.find(params[:id])
    @profile_image_url = nil
    if @organization.profile_image
        @profile_image_url = @organization.profile_image.url
    end
  end
end
