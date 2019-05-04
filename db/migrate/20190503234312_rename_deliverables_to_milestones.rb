class RenameDeliverablesToMilestones < ActiveRecord::Migration[5.2]
  def change
    rename_table :deliverables, :milestones
  end
end
