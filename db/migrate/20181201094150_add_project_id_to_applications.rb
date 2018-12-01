class AddProjectIdToApplications < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :project_id, :bigint
  end
end
