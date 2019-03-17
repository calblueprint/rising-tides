require 'test_helper'

class ApiProjectsControllerTest < ActionDispatch::IntegrationTest
  test "should get all projects" do
    get api_all_projects_url

    assert_response :success
  end

  test "should filter project by skill ids" do
    post api_projects_filter_url, params: { query: { with_skill_ids: [232994509] } }, xhr: true

    assert_response :success
    projects = JSON.parse(@response.body)
    assert_equal 1, projects.length
    assert_equal 864121040, projects[0]['id']
  end

  test "should create a new project" do
    post api_projects_url, params: { project: { 
        title: "My New Project",
        organization_id: 1,
        project_type_id: 1,
        project_status_id: 1,
        deliverable_type_id: 1,
        skill_ids: [232994509, 350906233, 602757090, 1032438339]
    } }, xhr: true

    assert_response :success
  end

end