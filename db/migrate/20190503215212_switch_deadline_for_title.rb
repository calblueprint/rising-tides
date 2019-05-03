class SwitchDeadlineForTitle < ActiveRecord::Migration[5.2]
  def change
    remove_column :deliverables, :deadline
    add_column :deliverables, :title, :string, null: false
  end
end
