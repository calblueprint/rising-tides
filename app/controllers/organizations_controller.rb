class OrganizationsController < ApplicationController
  #before_action :set_organization, only: [:show, :edit, :update, :destroy]

  def dashboard
  end

  def show
    @organization = Organization.find(params[:id])
  end
end
