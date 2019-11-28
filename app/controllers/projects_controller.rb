class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :update, :destroy]

  def index
    @user_type = current_user ? current_user.class.to_s : current_organization.class.to_s
    @skills = Skill.all
    @project_types = ProjectType.all
    @deliverable_types = DeliverableType.all
  end

  def new
    @skills = Skill.all
    @project_types = ProjectType.all
    @deliverable_types = DeliverableType.all
  end

  def edit
    @skills = Skill.all
    @project_types = ProjectType.all
    @deliverable_types = DeliverableType.all
    @project = Project.where(:id => params[:id])
        .with_application_count
        .includes(
          [:skills]
        ).as_json(
          include: [:skills]
        ).first
    @milestones = Project.find(params[:id]).milestones
  end

  def show
    if organization_signed_in? and @project.organization_id == current_organization.id
        @applications = @project.applications.with_project_organization_json
    end
    @photos = @project.photos.map { |p| p.image.url(:original) }

    if @project.organization.profile_image
        @org_image_url = @project.organization.profile_image.url
    end

    @reached_application_limit = @project.reached_application_limit?
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.where(
        :id => params[:id]
      ).with_application_count.first
      @milestones = Project.find(params[:id]).milestones
      @project_type = ProjectType.find(@project.project_type_id)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def project_params
        params.require(:project).permit(:title,
                                        :description,
                                        :overview,
                                        :volunteer_requirements,
                                        :deliverable,
                                        :question1,
                                        :question2,
                                        :question3,
                                        :application_limit,
                                        :user_limit,
                                        :start_time,
                                        :end_time,
                                        skill_ids: [])
    end
end
