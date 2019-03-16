class AddAttachmentResumeToUsers < ActiveRecord::Migration[5.2]
  def self.up
    change_table :users do |t|
      t.attachment :resume
    end
  end

  def self.down
    remove_attachment :users, :resume
  end
end
