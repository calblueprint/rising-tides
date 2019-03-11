class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]

  def new
  end

  def edit
  end

  def show
    @photos = @project.photos.map { |p| p.image.url(:original) }
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
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
                                        :question3)
    end
end
