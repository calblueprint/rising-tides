class Api::CommunityLeadersController < ApplicationController
  before_action :set_community_leader, only: [:show, :edit, :update, :destroy]
  respond_to :json

  # GET /community_leaders
  # GET /community_leaders.json
  def index
    @community_leaders = CommunityLeader.all
  end

  # GET /community_leaders/1
  # GET /community_leaders/1.json
  def show
    render json: @community_leader
  end

  # GET /community_leaders/new
  def new
    @community_leader = CommunityLeader.new
  end

  # GET /community_leaders/1/edit
  def edit
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_community_leader
      @community_leader = CommunityLeader.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def community_leader_params
      params.fetch(:community_leader, {})
    end
end
