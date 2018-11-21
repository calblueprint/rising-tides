class AddCityToOrganizations < ActiveRecord::Migration[5.2]
  def change
    add_column :organizations, :city, :string
  end
end
