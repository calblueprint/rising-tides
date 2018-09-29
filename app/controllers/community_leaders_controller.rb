class CommunityLeadersController < ApplicationController
  before_action :set_community_leader, only: [:show, :edit, :update, :destroy]

  # GET /community_leaders
  # GET /community_leaders.json
  def index
    @community_leaders = CommunityLeader.all
  end

  # GET /community_leaders/1
  # GET /community_leaders/1.json
  def show
  end

  # GET /community_leaders/new
  def new
    @community_leader = CommunityLeader.new
  end

  # GET /community_leaders/1/edit
  def edit
  end

  # POST /community_leaders
  # POST /community_leaders.json
  def create
    @community_leader = CommunityLeader.new(community_leader_params)

    respond_to do |format|
      if @community_leader.save
        format.html { redirect_to @community_leader, notice: 'Community leader was successfully created.' }
        format.json { render :show, status: :created, location: @community_leader }
      else
        format.html { render :new }
        format.json { render json: @community_leader.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /community_leaders/1
  # PATCH/PUT /community_leaders/1.json
  def update
    respond_to do |format|
      if @community_leader.update(community_leader_params)
        format.html { redirect_to @community_leader, notice: 'Community leader was successfully updated.' }
        format.json { render :show, status: :ok, location: @community_leader }
      else
        format.html { render :edit }
        format.json { render json: @community_leader.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /community_leaders/1
  # DELETE /community_leaders/1.json
  def destroy
    @community_leader.destroy
    respond_to do |format|
      format.html { redirect_to community_leaders_url, notice: 'Community leader was successfully destroyed.' }
      format.json { head :no_content }
    end
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
