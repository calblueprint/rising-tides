class AddFieldsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :city, :string
    add_column :users, :state, :string
    add_column :users, :link, :string
    add_column :users, :bio, :string
    add_column :users, :skills, :string
    add_column :users, :phone_number, :string
    remove_column :users, :role

    add_column :organizations, :name, :string
    add_column :organizations, :city, :string
    add_column :organizations, :state, :string
    add_column :organizations, :link, :string
    add_column :organizations, :description, :string
    add_column :organizations, :contact_first_name, :string
    add_column :organizations, :contact_last_name, :string
    add_column :organizations, :contact_phone_number, :string
  end
end
