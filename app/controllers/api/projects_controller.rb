class Api::ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]
  respond_to :json

  def index
    @projects = current_organization.projects.all
    render json:@projects
  end

  def index_all
    @projects =  Project.with_application_count

    render json: {
        projects: @projects,
        message: "Projects loaded..."
    }
  end

  def filter
    @projects = Project.filter(filter_params)
                       .with_application_count
                       .include_organization
    render json: {
        projects: @projects,
        message: "Projects loaded..."
    }
  end

  def show
    render json: {
        projects: @project,
        message: "Project loaded..."
    }
  end

  def create
    organization = Organization.find(params.require(:project).permit(:organization_id)[:organization_id])

    if not project_params[:title]
      return render json: {
        message: "Missing title."
      }, status: :unprocessable_entity
    end
    if not project_params[:description]
      return render json: {
        message: "Missing description."
      }, status: :unprocessable_entity
    end
    if not project_params[:start_time]
      return render json: {
        message: "Missing start time."
      }, status: :unprocessable_entity
    end
    if not project_params[:end_time]
      return render json: {
        message: "Missing end time."
      }, status: :unprocessable_entity
    end
    if not project_params[:skill_ids] or project_params[:skill_ids].length == 0
      return render json: {
        message: "Missing skills."
      }, status: :unprocessable_entity
    end
    if not project_params[:deliverable_type_id]
      return render json: {
        message: "Missing deliverable type."
      }, status: :unprocessable_entity
    end
    if not project_params[:project_type_id]
      return render json: {
        message: "Missing project type."
      }, status: :unprocessable_entity
    end
    if not project_params[:application_limit]
      return render json: {
        message: "Application Limit"
      }, status: :unprocessable_entity
    end
    if not project_params[:user_limit]
      return render json: {
        message: "Volunteer Limit"
      }, status: :unprocessable_entity
    end

    project = organization.projects.create(project_params)

    begin
      saved = project.save!
    end

    if saved
      begin
          for deliverable in params[:milestones]
            project.milestones.create(
                deliverable.permit(:description, :title)
            )
          end
      rescue StandardError => e
        project.milestones.delete_all
        project.delete
        return render json: {
            project: project,
            error: e
        }, status: :unprocessable_entity
      end


      return render json: {
        project: project,
        message: 'Project successfully created!'
      }
    end

    return render json: {
        error: 'Failed to create project.'
    }, status: :unprocessable_entity
  end

  def update
    begin
      project = Project.find(params[:id])
      a = project.update(project_params)
    end
    if a
      new_project = Project.find(params[:id])
      new_project.milestones.delete_all
      for deliverable in params[:milestones]
        new_project.milestones.create(
            deliverable.permit(:description, :title)
        )
      end
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
        :volunteer_requirements,
        :deliverable,
        :organization_id,
        :project_type_id,
        :deliverable_type_id,
        :start_time,
        :end_time,
        :application_limit,
        :additional_details,
        :user_limit,
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
            :with_accepted_user_id,
            :with_free_slots,
            :with_user_skills,
            with_project_statuses: [],
            with_skill_ids: [],
            with_project_type_ids: [],
            with_deliverable_type_ids: []
        )
    end
end
