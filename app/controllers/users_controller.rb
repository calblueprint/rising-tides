class UsersController < ApplicationController
  #before_action :set_user, only: [:show, :edit, :update, :destroy]

  def dashboard
  end

  def show
    @user = User.find(params[:id])
    @profile_image_url = nil
    if @user.profile_image
        @profile_image_url = @user.profile_image.url
    end
  end
end
