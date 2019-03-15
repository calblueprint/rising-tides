class Project < ApplicationRecord
  include Filterable
  belongs_to :organization
  belongs_to :project_type
  has_many :applications
  has_many :users
  has_many :photos
  has_and_belongs_to_many :skills

  scope :skills, -> (skill_ids) { distinct.
      joins(:skills).
      where('skills.id' => skill_ids).
      group(:id).
      having('count(skills.id) > 0', skill_ids.length) }
end
