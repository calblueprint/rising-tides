class Api::SkillsController < ApplicationController
  respond_to :json

  def index
    @skills = Skill.all
    render json:@skills
  end

  def create
    skill = Skill.create(skill_params)

    begin
      saved = skill.save!
    end

    if saved
      return render json: {message: 'Skill successfully created!'}
    end

    return render json: {error: projects.errors.full_messages,
                         status: 422}
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def skill_params
      params.require(:skill).permit(
        :name
      )
    end
end
