class Application < ApplicationRecord
  belongs_to :project
  belongs_to :user

  enum status: { pending: 0, denied: 1, interviewing: 2, accepted: 3 }
end
