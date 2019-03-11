class AddProjectTypeIdToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :project_type_id, :bigint
  end
end
