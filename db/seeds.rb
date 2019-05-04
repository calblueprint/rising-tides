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
    user.skip_confirmation!
    user.save
    puts "Created Volunteer ##{i} (#{user.id})"
  end
  user = User.create!(email: "peterkangveerman@gmail.com",
                        password: 'password',
                        password_confirmation: 'password',
                        first_name: "Peter",
                        last_name: "Veerman",
                        city: "Arcaida",
                        state: "CA",
                        bio: Faker::TvShows::RickAndMorty.quote,
                        phone_number: Faker::PhoneNumber.phone_number
  )
  user.skip_confirmation!
  user.save
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
    skill_ids = Skill.all.sample(3).pluck(:id)
    deliverable_id = DeliverableType.all.sample(1).first[:id]
    org_id = Organization.all.sample(1).first[:id]
    proj = Project.create!(title: Faker::IndustrySegments.industry,
                           description: Faker::TvShows::BojackHorseman.quote,
                           deliverable: Faker::Commerce.product_name,
                           overview: "1. #{Faker::Marketing.buzzwords} 2. #{Faker::Marketing.buzzwords}",
                           question1: Faker::Company.bs,
                           question2: Faker::Company.buzzword,
                           question3: Faker::Company.catch_phrase,
                           project_type_id: i % 2 + 1,
                           organization_id: org_id,
                           deliverable_type_id: deliverable_id,
                           skill_ids: skill_ids
    )
    proj.save
    puts "Created Project ##{i}. Owned by organization(id:#{org_id})"
  end
  puts "Created #{NUM_PROJECTS} projects! #{Project.count} projects in db."
  Project.create!(title: "No Applications",
                  description: Faker::TvShows::BojackHorseman.quote,
                  deliverable: Faker::Commerce.product_name,
                  overview: "1. #{Faker::Marketing.buzzwords} 2. #{Faker::Marketing.buzzwords}",
                  question1: Faker::Company.bs,
                  question2: Faker::Company.buzzword,
                  question3: Faker::Company.catch_phrase,
                  project_type_id: 1,
                  organization_id: 1,
                  deliverable_type_id: 1
  )
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

def create_skills
  skill_list = ['Accounting', 'Botany', 
    'Climate Change Adaptation (policy/planning)',
    'Climate Change Adaptation (technical)', 'Climate Science',
    'Communications', 'Cultural Resource Management', 'Data Analysis',
    'Design', 'Education', 'Emergency Management', 'Engineering',
    'Environmental Science', 'FEMA Expert',
    'Financial Planning & Budgeting', 'Grant Writing',
    'Historic Preservation', 'Historic Tax Credits Expert',
    'Intangible Heritage Documentation', 'Landscape Management',
    'Legal', 'Oral Histories', 'Public Relations & Outreach Programming',
    'Strategic Planning & Strategy Consulting']

  skill_list.each do |skill|
    Skill.create( name: skill )
  end
end

def create_deliverable_types
    deliverable_list = [
      'Environmental Planning & Historic Preservation in FEMA Compliance',
      'Policies & Standards',
      'Grant Template or Cover Letter',
      'Cost-Benefit Analysis of Adaptation Approaches',
      'Adaptation/Preservation Project Budget',
      'Inventory Creation of Historic Resources Vulnerable to Climate Change',
      'Baseline Documentation',
      'Risk Assessment & Hazard Mapping',
      'Monitoring Plan',
      'Facilitated Strategy Session on Climate Change Decision frameworks',
      'Cultural Resource Climate Change Management Plan',
      'Scenario Planning',
      'Adaptation Option Assessment',
      'Public Relations/Marketing/Education Climate Change & Historic Preservation',
      'Climate Heritage Tourism Program',
      'Cultural Resources Climate Change Literacy',
      'Facilitated Listening and Partnering',
      'Buildings & Structures Climate Change Adaptation',
      'Systems & Districts Climate Change Adaptation',
      'Museum Collection Climate Impact Adaptation',
      'Archeological Site Climate Change Adaptation',
      'Cultural Landscape Climate Change Adaptation',
      'Ethnographic Resource Climate Change Adaptation',
      'Food Sovereignty/Heritage',
      'Oral History Resource Assistance',
      'Community Disaster Risk Reduction & Response',
      'Connecting with disaster planning and response',
      'Local Climate Science & Impact Assessment',
      'Science Tools Training',
      'Preservation Science Training',
      'Integrate Cultural Resources Databases-geographic Information Systems'
    ]
    deliverable_list.each do |deliverable|
      DeliverableType.create( name: deliverable )
    end
end

create_admin
create_skills
create_deliverable_types
create_volunteers
create_organizations
create_project_types
create_projects
create_applications
create_skills

puts 'Seeding Finished!'




