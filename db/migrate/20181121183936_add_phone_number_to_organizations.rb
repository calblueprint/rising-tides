class AddPhoneNumberToOrganizations < ActiveRecord::Migration[5.2]
  def change
    add_column :organizations, :phone_number, :string
  end
end
