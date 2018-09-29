require 'test_helper'

class CommunityLeadersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @community_leader = community_leaders(:one)
  end

  test "should get index" do
    get community_leaders_url
    assert_response :success
  end

  test "should get new" do
    get new_community_leader_url
    assert_response :success
  end

  test "should create community_leader" do
    assert_difference('CommunityLeader.count') do
      post community_leaders_url, params: { community_leader: {  } }
    end

    assert_redirected_to community_leader_url(CommunityLeader.last)
  end

  test "should show community_leader" do
    get community_leader_url(@community_leader)
    assert_response :success
  end

  test "should get edit" do
    get edit_community_leader_url(@community_leader)
    assert_response :success
  end

  test "should update community_leader" do
    patch community_leader_url(@community_leader), params: { community_leader: {  } }
    assert_redirected_to community_leader_url(@community_leader)
  end

  test "should destroy community_leader" do
    assert_difference('CommunityLeader.count', -1) do
      delete community_leader_url(@community_leader)
    end

    assert_redirected_to community_leaders_url
  end
end
