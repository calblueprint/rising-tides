# Constants
NUM_USERS = 20
NUM_ORGANIZATIONS = 10
NUM_PROJECTS = 5
NUM_APPLICATIONS = NUM_PROJECTS * 2

# Use Faker gem to randomly generate fields
require 'faker'

def make_users
  1.upto(NUM_USERS) do |i|
    user = User.create!(email: "user#{i}@gmail.com",
                 password: 'password',
                 first_name: Faker::Name.first_name,
                 last_name: Faker::Name.last_name,
                 city: Faker::Address.city,
                 state: Faker::Address.state_abbr,
                 bio: Faker::RickAndMorty.quote,
                 phone_number: Faker::PhoneNumber.phone_number)
    user.save

  end
end
10.times do
  password = Faker::Internet.password
  User.create!(email: Faker::Internet.email,
               password: password,
               first_name: Faker::Name.first_name,
               last_name: Faker::Name.last_name,
               city: Faker::Address.city,
               state: Faker::Address.state_abbr,
               bio: Faker::RickAndMorty.quote,
               phone_number: Faker::PhoneNumber.phone_number)
end

5.times do
  password = Faker::Internet.password
  User.create!(email: Faker::Internet.email,
               password: password,
               name: Faker::Company.name,
               city: Faker::Address.city,
               state: Faker::Address.state_abbr,
               description: Faker::MichaelScott.quote)
end