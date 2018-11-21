class Api::ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]
  respond_to :json

  def index
    @projects = Project.all
    render json: @projects
  end

  def show
    render json: @project
  end

  def create
    project = Project.new(project_params)

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

  def edit
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_community_leader
      @project = Project.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def project_params
      params.require(:project).permit(
        :title,
        :description
      )
    end
end
