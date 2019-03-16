class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :applications
  has_and_belongs_to_many :skills

  has_attached_file :profile_image
  validates_attachment_content_type :profile_image, content_type: /\Aimage\/.*\z/

end
