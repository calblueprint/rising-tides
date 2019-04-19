class OrganizationsController < ApplicationController
  #before_action :set_organization, only: [:show, :edit, :update, :destroy]

  def dashboard
    @skills = Skill.all
    @project_types = ProjectType.all
    @deliverable_types = DeliverableType.all
    @organization_applications = current_organization
        .applications
        .limit(4)
        .with_project_organization_json
  end

  def my_projects
    @skills = Skill.all
    @project_types = ProjectType.all
    @deliverable_types = DeliverableType.all
  end

  def show
    @organization = Organization.find(params[:id])
    @profile_image_url = nil
    if @organization.profile_image
        @profile_image_url = @organization.profile_image.url
    end
  end
end
