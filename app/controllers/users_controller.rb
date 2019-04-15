class UsersController < ApplicationController
  #before_action :set_user, only: [:show, :edit, :update, :destroy]

  def dashboard
    @skills = Skill.all
    @project_types = ProjectType.all
    @deliverable_types = DeliverableType.all
    @user_applications = current_user.applications.limit(4)
        .with_project_organization_json
  end

  def show
    @user = User.find(params[:id])
    @profile_image_url = nil
    if @user.profile_image
        @profile_image_url = @user.profile_image.url
    end

    if @user.resume
        @resume_url = @user.resume.url
    end
  end
end
