require "application_system_test_case"

class CommunityLeadersTest < ApplicationSystemTestCase
  setup do
    @community_leader = community_leaders(:one)
  end

  test "visiting the index" do
    visit community_leaders_url
    assert_selector "h1", text: "Community Leaders"
  end

  test "creating a Community leader" do
    visit community_leaders_url
    click_on "New Community Leader"

    click_on "Create Community leader"

    assert_text "Community leader was successfully created"
    click_on "Back"
  end

  test "updating a Community leader" do
    visit community_leaders_url
    click_on "Edit", match: :first

    click_on "Update Community leader"

    assert_text "Community leader was successfully updated"
    click_on "Back"
  end

  test "destroying a Community leader" do
    visit community_leaders_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Community leader was successfully destroyed"
  end
end
