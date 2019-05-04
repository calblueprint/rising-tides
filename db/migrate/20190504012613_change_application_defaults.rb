class ChangeApplicationDefaults < ActiveRecord::Migration[5.2]
  def change
    change_column_default(:projects, :application_limit, 10)
    change_column_default(:projects, :user_limit, 3)
  end
end
