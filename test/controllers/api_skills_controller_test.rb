require 'test_helper'

class ApiSkillsControllerTest < ActionDispatch::IntegrationTest

  test "should create a new skill" do
    post api_skills_url, params: { skill: { name: "My New Skill" } }, xhr: true

    assert_response :success
    res = JSON.parse(@response.body)
    assert_equal "Skill successfully created!", res['message']
  end

end