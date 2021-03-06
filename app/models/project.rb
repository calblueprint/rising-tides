class Project < ApplicationRecord
  include Filterable
  belongs_to :organization
  belongs_to :project_type
  belongs_to :deliverable_type
  has_many :applications
  has_many :users, through: :applications
  has_many :photos
  has_many :milestones
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
  scope :with_user_id, -> (user_id) { distinct.
      left_joins(:applications).
      where('applications.user_id' => user_id).
      group(:id) }
  scope :with_accepted_user_id, -> (user_id) { distinct.
      left_joins(:applications).
      where('applications.status = 3 AND applications.user_id = ?', user_id).
      group(:id) }
  scope :with_organization_id, -> (organization_id) { where organization_id: organization_id }
  scope :with_limit, -> (_limit) { limit(_limit)}
  scope :with_application_count, -> () {
                        left_joins(:applications)
                        .group('projects.id')
                        .select('projects.*, COUNT(applications.id) AS application_count') }
  scope :with_project_statuses, -> (statuses) { where status: statuses }
  scope :with_free_slots, -> (is_free) {
    if is_free
        as_array = find_by_sql("SELECT projects.*, COUNT(applications.id) as application_count FROM projects LEFT OUTER JOIN applications ON applications.project_id = projects.id AND (applications.status = 0 OR applications.status = 2) GROUP BY projects.id HAVING COUNT(applications.id) < projects.application_limit")
        where(id: as_array.map(&:id))
    else
        as_array = find_by_sql("SELECT projects.*, COUNT(applications.id) as application_count FROM projects LEFT OUTER JOIN applications ON applications.project_id = projects.id AND (applications.status = 0 OR applications.status = 2) GROUP BY projects.id HAVING COUNT(applications.id) >= projects.application_limit")
        where(id: as_array.map(&:id))
    end
  }
  scope :with_user_skills, -> (user_id) {
    skill_ids = User.find(user_id).skills.pluck(:id)
    with_skill_ids(skill_ids)
  }
  scope :include_organization, -> () {
    includes(:organization).as_json(
        include: [
            :organization
        ]
    )
  }
  scope :include_deliverables, -> () {
    includes(:deliverables).as_json(
        include: [
            :deliverables
        ]
    )
  }

  enum status: { recruiting: 0, in_progress: 1, completed: 2 }

  def reached_application_limit?
    return self.applications.where(status: [0, 2]).length >= self.application_limit
  end

  def reached_user_limit?
    return self.applications
               .where(status: 3)
               .joins(:user)
               .group(:id)
               .length >= self.user_limit
  end


end
