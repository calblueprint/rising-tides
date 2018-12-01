class AddStatusToApplications < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :status, :integer, :default => 0
  end
end
