require 'test_helper'

class ApiUsersControllerTest < ActionDispatch::IntegrationTest

  test "should create a new user" do
    post user_registration_url, params: { user: { 
        email: "adsfj@dslkafj.com",
        password: 'password',
        password_confirmation: 'password',
        first_name: 'First Name',
        last_name: 'Last Name',
        linkedin_url: 'https://www.linkedin.com/in/alex-maccaw-ab592978/',
        skill_ids: [232994509, 350906233, 602757090, 1032438339]
    } }, xhr: true

    my_user = User.last
    assert_equal 'First Name', my_user.first_name
    assert_equal 4, my_user.skills.length
    assert_response :success
  end

end