class Api::ApplicationsController < ApplicationController
  before_action :set_application, only: [:show, :edit, :update, :destroy]
  respond_to :json

  def index
    @applications = Application.where(project_id: params[:project_id])
    render json: @applications
  end

  def user_index
    @applications = Application.where(user_id: params[:user_id])
    render json: @applications
  end

  def show
    render json: @application
  end

  def create
    project = Project.find(application_params['project_id'])
    if project.reached_application_limit?
        puts "Applications are closed"
        return render json: {message: 'Applications are closed.'}
    end

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

    return render json: {error: application.errors.full_messages,
                         status: 422}
  end

  def update
    begin
      application = Application.find(params[:id])
      a = application.update(application_params)
    end
    if a
      new_application = Application.find(params[:id])
      return render json: {message: 'Application successfully updated!',
                           project: new_application}
    else
      return render json: {error: application.errors.full_messages}
    end
  end

  def decide
    decision = params[:decision]

    begin
      application = Application.find(params[:id])
      if Application.statuses['accepted'] == Application.statuses[decision] and application.project.reached_user_limit?
        return render json: {message: 'Max applications already accepted.'}
      end
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
      return render json: {error: application.errors.full_messages}
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_application
      @application = Application.find(params[:id])
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
end
