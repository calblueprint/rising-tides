class AddFirstNameToOrganizations < ActiveRecord::Migration[5.2]
  def change
    add_column :organizations, :first_name, :string
  end
end
