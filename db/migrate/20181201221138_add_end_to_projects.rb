class AddEndToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :end_time, :datetime
  end
end
