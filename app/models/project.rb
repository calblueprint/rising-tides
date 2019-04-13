class Project < ApplicationRecord
  include Filterable
  belongs_to :organization
  belongs_to :project_type
  belongs_to :deliverable_type
  has_many :applications
  has_many :users
  has_many :photos
  has_and_belongs_to_many :skills

  scope :with_skill_ids, -> (skill_ids) { distinct.
      joins(:skills).
      where('skills.id' => skill_ids).
      group(:id).
      having('count(skills.id) > 0', skill_ids.length) }
  scope :with_project_type_ids, -> (project_type_ids) { distinct.
      joins(:project_type).
      where('project_types.id' => project_type_ids).
      group(:id).
      having('count(project_types.id) > 0', project_type_ids.length) }
  scope :with_deliverable_type_ids, -> (deliverable_type_ids) { distinct.
      joins(:deliverable_type).
      where('deliverable_types.id' => deliverable_type_ids).
      group(:id).
      having('count(deliverable_types.id) > 0', deliverable_type_ids.length) }
  scope :with_keyword, -> (keyword) { 
      where("LOWER(title) LIKE ? OR LOWER(description) LIKE ? OR ? = ''", "%#{keyword.downcase}%", "%#{keyword.downcase}%", keyword) }
  scope :with_deliverable_type, -> (deliverable_type_id) { where deliverable_type_id:  deliverable_type_id }

  enum status: { recruiting: 0, in_progress: 1, completed: 2 }

  def reached_application_limit?
    return self.applications.length >= self.application_limit
  end

  def reached_user_limit?
    return self.users.length >= self.application_limit
  end
end
