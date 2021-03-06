class Api::ApplicationsController < ApplicationController
  before_action :set_application, only: [:show, :edit, :update, :destroy]
  respond_to :json

  def index
    @applications = Application.where(project_id: params[:project_id])
    render json: @applications
  end

  def user_index
    @applications = Application.with_user_id(params[:user_id])
    render json: {
        applications: @applications,
        message: "Applications loaded..."
    }
  end

  def show
    render json: @application
  end

  def filter
    if (filter_params[:with_user_id] and
        current_user.id != filter_params[:with_user_id]) or
        (filter_params[:with_organization_id] and
        current_organization.id != filter_params[:with_organization_id])
          return render json: {
            error: "Not authorized to view these applications."
          }, status: :forbidden
    end
    @applications = Application.filter(filter_params)
        .with_project_organization_json
    render json: {
        applications: @applications,
        error: "Applications loaded..."
    }
  end

  def create
    project = Project.find(application_params['project_id'])
    if not application_params[:question1]
      return render json: {
        message: "Missing \"Why are you interested?\"."
      }, status: :unprocessable_entity
    end
    if not application_params[:question2]
      return render json: {
        message: "Missing \"Describe your relevant experience\"."
      }, status: :unprocessable_entity
    end
    raise Error::AppLimitError unless not project.reached_application_limit?

    application = Application.new(application_params)

    begin
      saved = application.save!
    end

    if saved
      UserMailer.with(
        user: current_user,
        organization: project.organization,
        project: project
      ).application_recieved.deliver_later
      return render json: {message: 'Application successfully created!',
                           application: application}
    end

    raise StandardError, application.errors.full_messages
  end

  def update
    begin
      application = Application.find(params[:id])
      a = application.update(application_params)
    end
    if a
      new_application = Application.find(params[:id])
      return render json: {message: 'Application successfully updated!',
                           application: new_application}
    else
      raise StandardError, application.errors.full_messages
    end
  end

  def decide
    decision = params[:decision]

    begin
      application = Application.find(params[:id])
      raise Error::MaxProjUserError unless 'accepted' != decision or not application.project.reached_user_limit?
      a = application.update_attribute(:status, decision)
    end
    if a
      new_application = Application.find(params[:id])
      UserMailer.with(
        application: new_application
      ).application_decision.deliver_later
      return render json: {message: 'Application successfully updated!',
                           application: new_application}
    else
      raise StandardError, application.errors.full_messages
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_application
      @application = Application.find(params[:id])
      if (current_user and
        current_user.id != @application.user.id) or
        (current_organization and
        current_organization.id != @application.project.organization.id)
        return render json: {
            message: "Not authorized to view these applications."
        }, status: :forbidden
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def application_params
      params.require(:application).permit(
        :question1,
        :question2,
        :question3,
        :project_id,
        :user_id
      )
    end

    def filter_params
        params.require(:query).permit(
            :with_keyword,
            :with_user_id,
            :with_organization_id,
            :with_limit,
            with_statuses: []
        )
    end
end
