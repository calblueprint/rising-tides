class AddQuestionsToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :question1, :text
    add_column :projects, :question2, :text
    add_column :projects, :question3, :text
  end
end
