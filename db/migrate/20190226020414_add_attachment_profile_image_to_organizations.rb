class AddAttachmentProfileImageToOrganizations < ActiveRecord::Migration[5.2]
  def self.up
    change_table :organizations do |t|
      t.attachment :profile_image
    end
  end

  def self.down
    remove_attachment :organizations, :profile_image
  end
end
