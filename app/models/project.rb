class Project < ApplicationRecord
  belongs_to :organization
  belongs_to :project_type
  has_many :applications
  has_many :users
  has_many :photos
end
