class CreateDeliverables < ActiveRecord::Migration[5.2]
  def change
    create_table :deliverables do |t|
      t.date :deadline
      t.string :description

      t.timestamps
    end
  end
end
