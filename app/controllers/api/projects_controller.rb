class Api::ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]
  respond_to :json

  def index
    @projects = current_organization.projects.all
    render json:@projects
  end

  def index_all
    @projects = Project.all
    render json:@projects
  end

  def filter
    @projects = Project.filter(filter_params)
    render json:@projects
  end

  def show
    render json: @project
  end

  def create
    organization = Organization.find(params.require(:project).permit(:organization_id)[:organization_id])

    project = organization.projects.create(project_params)

    begin
      saved = project.save!
    end

    if saved
      return render json: {message: 'Project successfully created!'}
    end

    raise StandardError, application.errors.full_messages
  end

  def update
    begin
      project = Project.find(params[:id])
      a = project.update(project_params)
    end
    if a
      new_project = Project.find(params[:id])
      return render json: {message: 'Project successfully updated!',
                           project: new_project}
    else
      raise StandardError, application.errors.full_messages
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def project_params
      params.require(:project).permit(
        :title,
        :description,
        :overview,
        :volunteer_requirements,
        :deliverable,
        :question1,
        :question2,
        :question3,
        :organization_id,
        :project_type_id,
        :deliverable_type_id,
        skill_ids: []
      )
    end

    def filter_params
        params.require(:query).permit(
            :with_deliverable_type,
            :with_keyword,
            :with_user_id,
            :with_organization_id,
            :with_limit,
            with_skill_ids: [],
            with_project_type_ids: [],
            with_deliverable_type_ids: []
        )
    end
end
