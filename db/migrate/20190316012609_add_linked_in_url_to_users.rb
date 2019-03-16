class AddLinkedInUrlToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :linkedin_url, :string
  end
end
