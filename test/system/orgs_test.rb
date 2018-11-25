require "application_system_test_case"

class OrgsTest < ApplicationSystemTestCase
  setup do
    @org = orgs(:one)
  end

  test "visiting the index" do
    visit orgs_url
    assert_selector "h1", text: "Orgs"
  end

  test "creating a Org" do
    visit orgs_url
    click_on "New Org"

    click_on "Create Org"

    assert_text "Org was successfully created"
    click_on "Back"
  end

  test "updating a Org" do
    visit orgs_url
    click_on "Edit", match: :first

    click_on "Update Org"

    assert_text "Org was successfully updated"
    click_on "Back"
  end

  test "destroying a Org" do
    visit orgs_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Org was successfully destroyed"
  end
end
