class Api::PhotosController < ApplicationController
  respond_to :json

  def index
    project = Project.find(params[:project_id])
    @photos = project.photos
  end

  def create
    photo = Photo.new(photo_params)

    begin
      saved = photo.save!
    end

    if saved
      return render json: {message: 'Photo successfully saved!'}
    end

    raise StandardError, application.errors.full_messages
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def photo_params
      params.require(:photo).permit(
        :image,
        :project_id
      )
    end
end
