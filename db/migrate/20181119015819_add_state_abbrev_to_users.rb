class AddStateAbbrevToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :state_abbrev, :string
  end
end
