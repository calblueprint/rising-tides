class AddFieldsToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :limit, :integer
    add_column :projects, :overview, :text
    add_column :projects, :deliverable, :text
    add_column :projects, :volunteer_requirements, :text
    add_column :projects, :other_details, :text
    add_column :projects, :organization_id, :integer

  end
end
