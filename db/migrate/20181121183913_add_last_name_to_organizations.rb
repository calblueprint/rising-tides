class AddLastNameToOrganizations < ActiveRecord::Migration[5.2]
  def change
    add_column :organizations, :last_name, :string
  end
end
