class AddProjectIdToPhotos < ActiveRecord::Migration[5.2]
  def change
    add_column :photos, :project_id, :bigint
  end
end
