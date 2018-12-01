class AddUserIdToApplication < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :user_id, :bigint
  end
end
