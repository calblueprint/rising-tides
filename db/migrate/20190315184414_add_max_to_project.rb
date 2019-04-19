class AddMaxToProject < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :application_limit, :integer, :default => 2
    add_column :projects, :user_limit, :integer, :default => 1
  end
end
