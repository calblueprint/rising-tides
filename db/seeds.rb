# Constants
NUM_USERS = 30
NUM_ORGANIZATIONS = 10
NUM_PROJECTS = 10
NUM_APPLICATIONS = 30

VOLUNTEER_START_ID = User.count + 1
VOLUNTEER_END_ID = VOLUNTEER_START_ID + NUM_USERS - 1
ORGANIZATION_START_ID = Organization.count + 1
ORGANIZATION_END_ID = ORGANIZATION_START_ID + NUM_ORGANIZATIONS - 1
PROJECT_START_ID = Project.count + 1
PROJECT_END_ID = PROJECT_START_ID + NUM_PROJECTS - 1

# Use Faker gem to randomly generate fields
require 'faker'

def create_admin
  admin = Admin.create!(email: 'admin@gmail.com',
                        password: 'password')
  admin.save
  puts 'Created Master Admin'
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
    puts "Created Volunteer ##{i} (#{user.id})"
  end
  puts "Created #{NUM_USERS} volunteers! #{User.count} volunteers in db."
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
    puts "Created Organization ##{i} (#{org.id})"
  end
  puts "Created #{NUM_ORGANIZATIONS} organizations! #{Organization.count} organizations in db."
end

def create_projects
  1.upto(NUM_PROJECTS) do |i|
    org_id = Faker::Number.between(ORGANIZATION_START_ID, ORGANIZATION_END_ID)
    proj = Project.create!(title: Faker::IndustrySegments.industry,
                           description: Faker::TvShows::BojackHorseman.quote,
                           deliverable: Faker::Commerce.product_name,
                           overview: "1. #{Faker::Marketing.buzzwords} 2. #{Faker::Marketing.buzzwords}",
                           question1: Faker::Company.bs,
                           question2: Faker::Company.buzzword,
                           question3: Faker::Company.catch_phrase,
                           project_type_id: i % 2 + 1,
                           organization_id: org_id
    )
    proj.save
    puts "Created Project ##{i}. Owned by organization(id:#{org_id})"
  end
  puts "Created #{NUM_PROJECTS} projects! #{Project.count} projects in db."
end

def create_applications
  1.upto(NUM_APPLICATIONS) do |i|
    skills = "1. #{Faker::Job.key_skill} 2. #{Faker::Job.key_skill} 3. #{Faker::Job.key_skill}"
    proj_id = Faker::Number.between(PROJECT_START_ID, PROJECT_END_ID - 2)
    user_id = Faker::Number.between(VOLUNTEER_START_ID, VOLUNTEER_END_ID)
    status = Faker::Number.between(0, 2)
    app = Application.create!(question1: "#{Faker::GreekPhilosophers.quote} #{Faker::GreekPhilosophers.quote}",
                              question2: "#{Faker::Hacker.say_something_smart} #{Faker::Hacker.say_something_smart}",
                              question3: skills,
                              project_id: proj_id,
                              user_id: user_id,
                              status: status
    )
    app.save
    puts "Created Application ##{i} (#{status}). Owned by volunteer(id:#{user_id}). Sent to project(id:#{proj_id})."
  end
  puts "Created #{NUM_APPLICATIONS} applications! #{Application.count} applications in db."
end

def create_project_types
  project_type_list = ['Full Length Project', 'Phone Consultation']
  
  project_type_list.each do |project_type|
    ProjectType.create( name: project_type )
  end
end

create_admin
create_volunteers
create_organizations
create_project_types
create_projects
create_applications
puts 'Seeding Finished!'




