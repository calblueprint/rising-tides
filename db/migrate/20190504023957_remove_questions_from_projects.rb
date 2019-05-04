class RemoveQuestion1FromProjects < ActiveRecord::Migration[5.2]
  def change
    remove_column :projects, :question1
    remove_column :projects, :question2
    remove_column :projects, :question3
    remove_column :projects, :overview
    rename_column :projects, :other_details, :additional_details
  end
end
