class Api::PhotosController < ApplicationController
  respond_to :json

  def index
    project = Project.find(params[:project_id])
    @photos = project.photos
  end

  def create
    photo = Photo.new(photo_params)
    # project = Project.find(params.require(:photo).permit(
    #     :project_id,
    #     :image
    #   )[:project_id])

    # photo = project.photos.create(photo_params)

    begin
      saved = photo.save!
    rescue ActiveRecord::StatementInvalid => invalid
      return render json: {message: 'Invalid photo'}
    end

    if saved
      return render json: {message: 'Photo successfully saved!'}
    end

    return render json: {error: photos.errors.full_messages,
                         status: 422}
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
