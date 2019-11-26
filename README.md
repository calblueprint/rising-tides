# Arctic Institute: Rising Tides

Rising Tides will be the first interactive online skills-based volunteering platform to connect professionals to communities in need of cultural heritage adaptation expertise.

## Technologies:
* Ruby 2.5.1
* Rails 5.2.1
* Postgresql

## Installation
```
git clone https://github.com/calblueprint/rising-tides.git
cd rising-tides
gem install bundler -v '2.0.1'
bundle install
yarn install
gem install mailcatcher
```

Open a seperate terminal tab and execute the following command
- `mailcatcher`
- Go to http://localhost:1080/ to view the SMTP server web interface

Set up the database
```
rake db:create
rake db:migrate
rake db:seed
```
Start the rails server

- `rails s`
### Accessing the Rising Tides Application
- http://localhost:3000/
- Use credentials from the seed file to log-in

### Accessing the Admin Dashboard
- http://localhost:3000/admins/sign_in
- Use credentials from the seed file to log-in


## Webpacker/react
If setting up webpacker/react for the first time, run:
```
rails webpacker:install
rails webpacker:install:react
rails generate react:install
```

### Using Whales:
First time installation: run `whales bootstrap`
```
whales s
```
