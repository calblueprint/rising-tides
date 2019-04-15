class SetApplicationStatusDefault < ActiveRecord::Migration[5.2]
  def change
    change_column_default(
      :applications,
      :status,
      0
    )
  end
end
