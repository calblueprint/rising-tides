class AddStateToOrganizations < ActiveRecord::Migration[5.2]
  def change
    add_column :organizations, :state, :string
  end
end
