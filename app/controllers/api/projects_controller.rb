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

  def show
    render json: @project
  end

  def create
    organization = Organization.find(params.require(:project).permit(:organization_id)[:organization_id])

    project = organization.projects.create(project_params)

    begin
      saved = project.save!
    rescue ActiveRecord::StatementInvalid => invalid
      return render json: {message: 'Invalid project'}
    end

    if saved
      return render json: {message: 'Project successfully created!'}
    end

    return render json: {error: projects.errors.full_messages,
                         status: 422}
  end

  def update
    begin
      project = Project.find(params[:id])
      a = project.update(project_params)
    rescue
      return render json: {error: "Forbidden"}
    end
    if a
      new_project = Project.find(params[:id])
      return render json: {message: 'Project successfully updated!',
                           project: new_project}
    else
      return render json: {error: project.errors.full_messages}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
      @project.project_type_name = ProjectType.find(@project.project_type_id)
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
        :project_type_id
      )
    end
end
