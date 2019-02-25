# Constants
NUM_USERS = 30
NUM_ORGANIZATIONS = 10
NUM_PROJECTS = 5
NUM_APPLICATIONS = NUM_PROJECTS * 2

# Use Faker gem to randomly generate fields
require 'faker'

def create_admin
  admin = Admin.create!(email: 'admin@gmail.com',
                        password: 'password')
  admin.save
  puts 'Created Admin'
end

def create_volunteers
  1.upto(NUM_USERS) do |i|
    user = User.create!(email: "user#{i}@gmail.com",
                        password: 'password',
                        password_confirmation: 'password',
                        first_name: Faker::Name.first_name,
                        last_name: Faker::Name.last_name,
                        city: Faker::Address.city,
                        state: Faker::Address.state_abbr,
                        bio: Faker::TvShows::RickAndMorty.quote,
                        phone_number: Faker::PhoneNumber.phone_number
    )
    user.save
    puts "Created Volunteer ##{i}"
  end
  puts "#{User.count} volunteers in db!"
end

def create_organizations
  1.upto(NUM_ORGANIZATIONS) do |i|
    org = Organization.create!(email: "org#{i}@gmail.com",
                               password: 'password',
                               name: Faker::Company.name,
                               city: Faker::Address.city,
                               state: Faker::Address.state_abbr,
                               description: Faker::TvShows::MichaelScott.quote
    )
    org.save
    puts "Created Organization ##{i}"
  end
  puts "#{Organization.count} organizations in db!"
end

create_admin
create_volunteers
create_organizations
puts 'Seeding Finished!'

#
# def make_projects
#   1.upto(NUM_PROJECTS) do
#     proj = Project.create!(
#         title: Faker::IndustrySegments.industry,
#         description: Faker::TvShows::BojackHorseman.quote,
#         overview:
#     )
#   end
# end