class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  respond_to :json

  def index
    @users = User.all
    render json:@users
  end

  def show
    render json: @user
  end

  def create
    user = User.new(user_params)

    begin
      saved = user.save!
    end

    if saved
      return render json: {message: 'User successfully created!'}
    end

    raise StandardError, application.errors.full_messages
  end

  def update
    begin
      user = User.find(params[:id])
      a = user.update(user_params)
    end
    if a
      new_user = User.find(params[:id])
      return render json: {message: 'User successfully updated!',
                           user: new_user}
    else
      raise StandardError, application.errors.full_messages
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(
        :email,
        :city,
        :state,
        :link,
        :password,
        :password_confirmation,
        :profile_image,
        :description,
        :first_name,
        :last_name,
        :phone_number,
      )
    end
end
