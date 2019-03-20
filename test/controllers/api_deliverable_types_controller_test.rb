require 'test_helper'

class ApiDeliverableTypesControllerTest < ActionDispatch::IntegrationTest

  test "should create a new deliverable type" do
    post api_deliverable_types_url, params: { deliverable_type: { name: "My New Deliverable Type" } }, xhr: true

    assert_response :success
    res = JSON.parse(@response.body)
    assert_equal "Deliverable type successfully created!", res['message']
  end

end