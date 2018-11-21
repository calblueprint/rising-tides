class AddLinkToOrganizations < ActiveRecord::Migration[5.2]
  def change
    add_column :organizations, :link, :string
  end
end
