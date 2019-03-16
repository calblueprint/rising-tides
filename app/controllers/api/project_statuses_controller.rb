class Api::ProjectStatusesController < ApplicationController
  respond_to :json

  def index
    @project_statuses = ProjectStatus.all
    render json:@project_status
  end

  def create
    project_status = ProjectStatus.create(project_status_params)

    begin
      saved = project_status.save!
    rescue ActiveRecord::StatementInvalid => invalid
      return render json: {message: 'Invalid project status'}
    end

    if saved
      return render json: {message: 'Project status successfully created!'}
    end

    return render json: {error: projects.errors.full_messages,
                         status: 422}
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def project_status_params
      params.require(:project_status).permit(
        :name
      )
    end
end
