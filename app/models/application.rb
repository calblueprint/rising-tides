class Application < ApplicationRecord
  include Filterable
  belongs_to :project
  belongs_to :user
  delegate :organization, to: :project

  enum status: { pending: 0, denied: 1, interviewing: 2, accepted: 3 }

  scope :with_keyword, -> (keyword) { 
      joins(:project).
      joins('INNER JOIN organizations ON projects.organization_id = organizations.id').
      group(:id).
      where("LOWER(projects.title) LIKE ? OR LOWER(organizations.name) LIKE ? OR ? = ''", "%#{keyword.downcase}%", "%#{keyword.downcase}%", keyword) }
  scope :with_statuses, -> (_statuses) { where(status: _statuses) }
  scope :with_user_id, -> (user_id) { where user_id: user_id }
end
