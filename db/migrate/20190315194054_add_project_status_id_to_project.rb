class AddProjectStatusIdToProject < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :project_status_id, :bigint, :default => 1
  end
end
