class AddProjectIdToDeliverables < ActiveRecord::Migration[5.2]
  def change
    add_column :deliverables, :project_id, :bigint
  end
end
