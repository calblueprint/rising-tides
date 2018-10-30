class AddIsLeaderToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :is_leader, :boolean
  end
end
