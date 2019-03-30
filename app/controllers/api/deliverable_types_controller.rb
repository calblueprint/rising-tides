class Api::DeliverableTypesController < ApplicationController
  respond_to :json

  def index
    @deliverable_types = DeliverableType.all
    render json:@deliverable_types
  end

  def create
    deliverable_type = DeliverableType.create(deliverable_type_params)

    begin
      saved = deliverable_type.save!
    rescue ActiveRecord::StatementInvalid => invalid
      return render json: {message: 'Invalid deliverable type'}
    end

    if saved
      return render json: {message: 'Deliverable type successfully created!'}
    end

    return render json: {error: projects.errors.full_messages,
                         status: 422}
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def deliverable_type_params
      params.require(:deliverable_type).permit(
        :name
      )
    end
end