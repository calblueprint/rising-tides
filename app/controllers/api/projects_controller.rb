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

  def new
    @community_leader = Project.new
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
      params.fetch(:project, {})
    end
end
