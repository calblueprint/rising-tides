class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  has_many :applications
  has_and_belongs_to_many :skills

  has_attached_file :profile_image
  validates_attachment_content_type :profile_image, content_type: /\Aimage\/.*\z/

  has_attached_file :resume
  validates_attachment_content_type :resume, content_type: ["application/pdf","application/vnd.ms-excel",     
         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
         "application/msword", 
         "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
         "text/plain"]

end
