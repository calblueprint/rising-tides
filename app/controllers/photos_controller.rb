class PhotosController < ApplicationController
  before_action :set_photo, only: [:show, :edit, :update, :destroy]

  # GET /applications/new
  def new
    @project_id = params[:project_id]
  end

end
