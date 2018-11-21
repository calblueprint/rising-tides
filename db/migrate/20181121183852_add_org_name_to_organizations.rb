class AddOrgNameToOrganizations < ActiveRecord::Migration[5.2]
  def change
    add_column :organizations, :org_name, :string
  end
end
