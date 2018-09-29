require "application_system_test_case"

class AdminsTest < ApplicationSystemTestCase
  setup do
    @admin = admins(:one)
  end

  test "visiting the index" do
    visit admins_url
    assert_selector "h1", text: "Admins"
  end

  test "creating a Admin" do
    visit admins_url
    click_on "New Admin"

    click_on "Create Admin"

    assert_text "Admin was successfully created"
    click_on "Back"
  end

  test "updating a Admin" do
    visit admins_url
    click_on "Edit", match: :first

    click_on "Update Admin"

    assert_text "Admin was successfully updated"
    click_on "Back"
  end

  test "destroying a Admin" do
    visit admins_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Admin was successfully destroyed"
  end
end
