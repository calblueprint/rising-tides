class Project < ApplicationRecord
  belongs_to :organization
  has_many :applications
  has_many :users
  has_many :photos
end
