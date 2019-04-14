class PagesController < ApplicationController
  def new
  end

  def create
  end

  def home
    @skills = Skill.all
    @project_types = ProjectType.all
    @deliverable_types = DeliverableType.all
  end

  def dashboard
    @skills = Skill.all
    @project_types = ProjectType.all
    @deliverable_types = DeliverableType.all
  end
end
