class Api::ApplicationsController < ApplicationController
  before_action :set_application, only: [:show, :edit, :update, :destroy]
  respond_to :json

  def index
    @applications = Application.where(project_id: params[:project_id])
    render json: @applications
  end

  def show
    render json: @application
  end

  def create
    application = Application.new(application_params)

    begin
      saved = application.save!
    rescue ActiveRecord::StatementInvalid => invalid
      return render json: {message: 'Invalid application'}
    end

    if saved
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
    rescue
      return render json: {error: "Forbidden"}
    end
    if a
      new_application = Application.find(params[:id])
      return render json: {message: 'Project successfully updated!',
                           project: new_application}
    else
      return render json: {error: application.errors.full_messages}
    end
  end

  def decide
    decision = params[:decision]
    application = Application.find(params[:id])

    application.update(status: decision)
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
