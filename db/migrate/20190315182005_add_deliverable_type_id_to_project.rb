class AddDeliverableTypeIdToProject < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :deliverable_type_id, :bigint
  end
end
