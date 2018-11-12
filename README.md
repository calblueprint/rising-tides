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
bundle install
yarn install
```

If setting up webpacker/react for the first time, run:
```
rails webpacker:install       # OR (on rails version < 5.0) rake webpacker:install
rails webpacker:install:react # OR (on rails version < 5.0) rake webpacker:install:react
rails generate react:install
```
