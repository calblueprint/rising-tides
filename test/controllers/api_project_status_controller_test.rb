require 'test_helper'

class ApiProjectStatusesControllerTest < ActionDispatch::IntegrationTest

  test "should create a new project status" do
    post api_project_statuses_url, params: { project_status: { name: "My New Project Status" } }, xhr: true

    assert_response :success
    res = JSON.parse(@response.body)
    assert_equal "Project status successfully created!", res['message']
  end

end