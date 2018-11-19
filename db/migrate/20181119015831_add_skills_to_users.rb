class AddSkillsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :skills, :string
  end
end
