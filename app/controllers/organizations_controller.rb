class OrganizationsController < ApplicationController
  #before_action :set_organization, only: [:show, :edit, :update, :destroy]

  def dashboard
    @skills = Skill.all
    @project_types = ProjectType.all
    @deliverable_types = DeliverableType.all
    @organization_applications = current_organization
        .applications
        .limit(4)
        .includes(
            [:project, :user]
        ).as_json(
            include: [:project, :user]
        )
  end

  def show
    @organization = Organization.find(params[:id])
    @profile_image_url = nil
    if @organization.profile_image
        @profile_image_url = @organization.profile_image.url
    end
  end
end
