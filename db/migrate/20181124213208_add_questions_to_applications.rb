class AddQuestionsToApplications < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :question1, :text
    add_column :applications, :question2, :text
    add_column :applications, :question3, :text
  end
end
