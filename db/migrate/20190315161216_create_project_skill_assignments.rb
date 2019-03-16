class CreateProjectSkillAssignments < ActiveRecord::Migration[5.2]
  def change
    create_table :project_skill_assignments do |t|
      t.references :project, index: true, foreign_key: true
      t.references :skill, index: true, foreign_key: true

      t.timestamps
    end
  end
end
