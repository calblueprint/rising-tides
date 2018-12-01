class AddStartToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :start_time, :datetime
  end
end
